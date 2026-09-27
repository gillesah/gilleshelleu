#!/usr/bin/env bash
# Déploie gilleshelleu.com sur lemeon2, lancé à la main depuis le poste : plus de
# GitHub Actions (incident de facturation GitHub du 21/09/2026, qui bloque tous les
# workflows sans rien signaler — voir ~/ghdev/CLAUDE.md, section « Déploiement »).
#
# Mécanisme :
#  - le site (Nuxt SSG) est construit ICI, sur le poste de dev, jamais sur lemeon2
#    (2 vCPU, sites clients à terre ; un build Node dans l'image a déjà gelé le
#    serveur 70 min le 05/09/2026) ;
#  - le résultat (.output/public) est envoyé par rsync dans une release horodatée
#    sous /var/www/gilleshelleu/html/releases/ ;
#  - la bascule est un symlink `html/current` repointé de façon atomique
#    (ln -sfn + mv -T sur le même système de fichiers). Le conteneur nginx monte
#    tout le dossier `html/` en volume UNE FOIS pour toutes (docker-compose.yml) :
#    retargeter le symlink à l'intérieur de ce volume déjà monté est visible
#    immédiatement, sans recréer le conteneur — donc aucune bascule à moitié
#    servie et aucun redémarrage sur un déploiement de contenu ordinaire ;
#  - Dockerfile/docker-compose.yml/nginx.conf/api/ restent suivis par un `git pull
#    --ff-only` sur le serveur (comme avant), mais l'image n'est reconstruite QUE
#    si ces fichiers ont changé depuis le dernier déploiement — un site perso n'a
#    pas besoin de rebuilder nginx à chaque post ;
#  - tout ce qui tourne sur lemeon2 (git pull, build éventuel, docker) passe sous
#    `deploy-guard`, le verrou global posé le 26/09/2026 après l'incident dockerd
#    (sérialise tous les projets, attend que la charge redescende) ;
#  - un build resté nécessaire est bridé à 1 cœur / 3 Go, `DOCKER_BUILDKIT=0`
#    (BuildKit ignore --cpu-quota/--memory sans erreur), comme AdminPanel ;
#  - on vérifie à la fin que le site répond ET que la page contient le titre
#    attendu, pas seulement un code 200.
#
# Usage :
#   deploy/deployer.sh            déploiement réel
#   deploy/deployer.sh --a-blanc  build + vérifications, RIEN n'est écrit sur le serveur
set -euo pipefail
cd "$(dirname "$0")/.."

DRY_RUN=0
[ "${1:-}" = "--a-blanc" ] && DRY_RUN=1

SITE_URL="https://gilleshelleu.com/"
EXPECTED_TITLE="Gilles Helleu"
REMOTE_HOST="lemeon2"
REMOTE_DIR="/var/www/gilleshelleu"

log() { echo "[$(date -Iseconds)] $*"; }

# --- Gates locaux -----------------------------------------------------------

[ "$(git rev-parse --abbrev-ref HEAD)" = main ] || { echo "Déployer depuis main."; exit 1; }
# -uno : on ignore les fichiers non suivis (dist/, images de brouillon…) — seuls les
# fichiers SUIVIS modifiés ou en attente d'ajout bloquent le déploiement.
[ -z "$(git status --porcelain -uno)" ] || { echo "Arbre de travail non propre (fichiers suivis modifiés)."; exit 1; }
git fetch -q origin main
COMMIT=$(git rev-parse HEAD)
[ "$COMMIT" = "$(git rev-parse origin/main)" ] || { echo "main local et origin/main diffèrent : pousse d'abord."; exit 1; }
SHORT=${COMMIT:0:7}

log "Build local du site (commit ${SHORT})…"
npm ci
npm run generate

[ -f .output/public/index.html ] || { echo "Génération incomplète : .output/public/index.html absent."; exit 1; }
grep -q "$EXPECTED_TITLE" .output/public/index.html || { echo "La page générée ne contient pas le titre attendu (\"$EXPECTED_TITLE\") : arrêt."; exit 1; }
log "Build OK, page d'accueil sanity-checkée localement."

RELEASE="$(date -u +%Y%m%d-%H%M%S)-${SHORT}"

if [ "$DRY_RUN" = 1 ]; then
    log "--a-blanc : build fait, RIEN n'est envoyé/écrit sur ${REMOTE_HOST}."
    log "Release qui aurait été créée : ${REMOTE_DIR}/html/releases/${RELEASE}"
    ssh "$REMOTE_HOST" "test -d ${REMOTE_DIR} && echo 'OK: dossier serveur présent' ; command -v deploy-guard >/dev/null && echo 'OK: deploy-guard présent' ; df -h ${REMOTE_DIR} | tail -1"
    CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$SITE_URL" || true)
    log "État actuel du site en ligne (avant tout déploiement) : HTTP ${CODE}"
    log "Essai à blanc terminé, rien n'a changé sur ${REMOTE_HOST}."
    exit 0
fi

# --- Envoi de la release ------------------------------------------------------

log "Envoi de la release ${RELEASE} vers ${REMOTE_HOST}…"
ssh "$REMOTE_HOST" "mkdir -p ${REMOTE_DIR}/html/releases/${RELEASE}"
rsync -a --delete .output/public/ "${REMOTE_HOST}:${REMOTE_DIR}/html/releases/${RELEASE}/"

# --- Bascule + build conditionnel, sous deploy-guard --------------------------

log "Bascule sur ${REMOTE_HOST} (sous deploy-guard)…"
ssh "$REMOTE_HOST" deploy-guard bash -s "$COMMIT" "$RELEASE" <<'DISTANT'
set -euo pipefail
COMMIT="$1"
RELEASE="$2"
cd /var/www/gilleshelleu

OLD_HEAD=$(git rev-parse HEAD)
git pull --ff-only -q origin main
[ "$(git rev-parse HEAD)" = "$COMMIT" ] || { echo "Le serveur n'est pas sur le commit attendu après pull."; exit 1; }

PREV_RELEASE=""
[ -L html/current ] && PREV_RELEASE=$(readlink html/current)

# Bascule atomique : le symlink est retargeté à l'intérieur du volume déjà monté
# par le conteneur (html/ est monté en entier) — visible immédiatement, pas de
# restart, pas de site à moitié copié.
ln -sfn "releases/${RELEASE}" html/current.tmp
mv -Tf html/current.tmp html/current
echo "Bascule faite : current -> releases/${RELEASE} (précédent : ${PREV_RELEASE:-aucun})"

# Rebuild uniquement si les fichiers concernés ont changé depuis le commit précédent.
CHANGED=$(git diff --name-only "$OLD_HEAD" "$COMMIT" 2>/dev/null || true)
NEED_WEB=0
NEED_API=0
echo "$CHANGED" | grep -qE '^(Dockerfile|nginx\.conf|docker-compose\.yml)$' && NEED_WEB=1
echo "$CHANGED" | grep -qE '^api/' && NEED_API=1
docker ps --filter name=gilleshelleu-web-1 --format '{{.Names}}' | grep -q . || NEED_WEB=1
docker ps --filter name=gilleshelleu-api-1 --format '{{.Names}}' | grep -q . || NEED_API=1

if [ "$NEED_WEB" = 1 ]; then
    echo "web : Dockerfile/nginx.conf/compose changés ou conteneur absent, rebuild bridé…"
    DOCKER_BUILDKIT=0 docker build -q --cpu-period=100000 --cpu-quota=100000 --memory=3g \
      -t gilleshelleu-web:latest .
    docker compose up -d --no-build web
fi
if [ "$NEED_API" = 1 ]; then
    echo "api : api/ changé ou conteneur absent, rebuild bridé…"
    DOCKER_BUILDKIT=0 docker build -q --cpu-period=100000 --cpu-quota=100000 --memory=3g \
      -t gilleshelleu-api:latest api
    docker compose up -d --no-build api
fi
if [ "$NEED_WEB" = 0 ] && [ "$NEED_API" = 0 ]; then
    echo "Aucun changement d'image : contenu servi via le volume, rien à reconstruire."
fi

docker image prune -f >/dev/null
docker ps --filter name=gilleshelleu --format "{{.Names}}: {{.Status}}"

# Purge des vieilles releases (on garde les 5 dernières + celle en cours).
cd html/releases
{ ls -1 | sort | head -n -5 | grep -v "^${RELEASE}\$" || true; } | xargs -r rm -rf --
DISTANT

# --- Contrôle final -----------------------------------------------------------

log "Contrôle du site en ligne…"
OK=0
for i in $(seq 1 12); do
    CODE=$(curl -s -o /tmp/gilleshelleu-check.html -w '%{http_code}' --max-time 10 "$SITE_URL" || true)
    if [ "$CODE" = 200 ] && grep -q "$EXPECTED_TITLE" /tmp/gilleshelleu-check.html; then
        OK=1
        break
    fi
    sleep 5
done
rm -f /tmp/gilleshelleu-check.html

if [ "$OK" = 1 ]; then
    log "en ligne (${SHORT})."
    exit 0
fi
echo "Le site ne répond pas correctement après déploiement (code=${CODE:-?}, titre attendu absent)."
echo "Retour arrière : ssh ${REMOTE_HOST} \"cd ${REMOTE_DIR} && ln -sfn releases/<release-precedente> html/current.tmp && mv -Tf html/current.tmp html/current\""
echo "(la release précédente est listée ci-dessus, ligne « Bascule faite »)."
exit 1
