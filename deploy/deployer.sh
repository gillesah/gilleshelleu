#!/usr/bin/env bash
# Déploie gilleshelleu.com sur Cloudflare Pages (direct upload, sans connexion
# GitHub), lancé à la main depuis le poste. Bascule du 27/09/2026 : le site
# était sur lemeon2 (nginx + Docker), il est maintenant sur Cloudflare Pages.
# Voir CLAUDE.md pour le détail de la bascule et le filet lemeon2 (7 jours).
#
# Mécanisme :
#  - le site (Nuxt SSG) est construit ICI, sur le poste de dev (npm ci && npm
#    run generate) ;
#  - l'envoi se fait par `wrangler pages deploy .output/public` en direct
#    upload : Cloudflare Pages est intrinsèquement atomique (chaque déploiement
#    est une nouvelle version immuable, la bascule en production est instantanée,
#    pas de site à moitié servi) ;
#  - le jeton Cloudflare (droits Account > Cloudflare Pages > Edit) est lu dans
#    le coffre à secrets (~/ghdev/.secrets.json, clé cloudflare.pages_token),
#    jamais écrit en clair ni journalisé ;
#  - contrôle final : https://gilleshelleu.com/ répond 200 ET contient le titre
#    attendu, plus quelques routes clés (/methode, /cv, /projets/forgr).
#
# Retour arrière (un déploiement Pages est immuable, jamais écrasé) :
#  - Dashboard : Cloudflare → Workers & Pages → gilleshelleu → Deployments →
#    sur l'ancien déploiement voulu → "Rollback to this deployment" (bouton),
#    bascule production instantanée, sans rebuild ;
#  - CLI : `wrangler pages deployment list --project-name gilleshelleu` pour
#    lister les déploiements (chacun reste accessible à son URL
#    <hash>.gilleshelleu.pages.dev) ; pour repromouvoir un ancien commit sans
#    passer par le dashboard, le plus simple est de checkout ce commit et de
#    relancer ce script (nouveau déploiement Pages = ancien contenu, à nouveau
#    en tête).
#
# Formulaire de contact : reste hors de ce déploiement. Il vit sur lemeon2
# (conteneur `api`, derrière api.gilleshelleu.com, CORS restreint à
# gilleshelleu.com/www) — voir deploy/deployer-lemeon2.sh pour le redéployer.
#
# Usage :
#   deploy/deployer.sh            déploiement réel
#   deploy/deployer.sh --a-blanc  build + vérifications, RIEN n'est publié
set -euo pipefail
cd "$(dirname "$0")/.."

DRY_RUN=0
[ "${1:-}" = "--a-blanc" ] && DRY_RUN=1

SITE_URL="https://gilleshelleu.com/"
EXPECTED_TITLE="Gilles Helleu"
PROJECT_NAME="gilleshelleu"
ACCOUNT_ID="103628de3cfa2d51c0fe0c74fdf2d60c"  # compte perso de Gilles (Helleugilles@gmail.com's Account)

log() { echo "[$(date -Iseconds)] $*"; }

# --- Gates locaux -----------------------------------------------------------

[ "$(git rev-parse --abbrev-ref HEAD)" = main ] || { echo "Déployer depuis main."; exit 1; }
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

if [ "$DRY_RUN" = 1 ]; then
    log "--a-blanc : build fait, RIEN n'est publié sur Cloudflare Pages."
    CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$SITE_URL" || true)
    log "État actuel du site en ligne (avant tout déploiement) : HTTP ${CODE}"
    log "Essai à blanc terminé, rien n'a changé."
    exit 0
fi

# --- Jeton Cloudflare (coffre, jamais affiché) -------------------------------

CF_TOKEN=$(python3 -c "
import sys
sys.path.insert(0, '/home/gillesah/ghdev')
from secret import lire
print(lire('cloudflare.pages_token') or '')
")
[ -n "$CF_TOKEN" ] || { echo "cloudflare.pages_token absent du coffre (./secret set cloudflare.pages_token)."; exit 1; }

# --- Déploiement Cloudflare Pages --------------------------------------------

log "Déploiement sur Cloudflare Pages (projet ${PROJECT_NAME})…"
CLOUDFLARE_API_TOKEN="$CF_TOKEN" CLOUDFLARE_ACCOUNT_ID="$ACCOUNT_ID" \
    npx wrangler pages deploy .output/public --project-name "$PROJECT_NAME" --commit-dirty=true

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

if [ "$OK" != 1 ]; then
    echo "Le site ne répond pas correctement après déploiement (code=${CODE:-?}, titre attendu absent)."
    echo "Retour arrière : dashboard Cloudflare → Workers & Pages → ${PROJECT_NAME} → Deployments → ancien déploiement → Rollback."
    exit 1
fi

FAIL=0
for p in /methode /cv /projets/forgr /projets/fluenzr /projets/ciicir /projets/timalio /projets/gulliver; do
    C=$(curl -sL -o /dev/null -w '%{http_code}' --max-time 10 "https://gilleshelleu.com${p}" || true)
    if [ "$C" != 200 ]; then
        echo "  ${p} -> ${C} (attendu 200)"
        FAIL=1
    fi
done

if [ "$FAIL" = 1 ]; then
    echo "Une ou plusieurs routes secondaires ne répondent pas 200 : vérifier manuellement."
    exit 1
fi

log "en ligne (${SHORT})."
