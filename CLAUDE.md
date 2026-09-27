# gilleshelleu.com — Site personnel de Gilles

## Stack

- **Nuxt 3** en mode SSG (`nuxt generate`)
- **Docker** : nginx Alpine servant `html/current` (volume monté, voir CI/CD ci-dessous), port **8106**
- **Serveur** : lemeon2 (`ssh lemeon2`), dossier `/var/www/gilleshelleu`
- **CI/CD** : script `deploy/deployer.sh`, lancé à la main depuis le poste (plus de GitHub Actions)
- **Domaine** : gilleshelleu.com (Cloudflare Registrar)
- **SSL** : Certbot sur lemeon2

## Positionnement

> "Je construis avec l'IA. Je n'en parle pas — je l'utilise."

Gilles est entrepreneur, fondateur de FluenzR, auteur en cours. Il se positionne comme **référence pour les entrepreneurs qui veulent intégrer l'IA dans leur business** — pas en théorie, sur le terrain.

## Structure des pages

```
/ (index)       → Hero + Projets + About + Contact
/projets        → FluenzR, Gulliver, openNoClaw, livre
/articles       → Agrégation Medium + LinkedIn (à venir)
/livre          → Teaser + avancement du livre (à venir)
/contact        → Formulaire / email
```

## Contenu clé

| Section | Message |
|---------|---------|
| Hero | "Je construis avec l'IA. Je n'en parle pas — je l'utilise." |
| Sous-titre | Entrepreneur, fondateur de FluenzR. J'aide les entrepreneurs à faire pareil. |
| Projets | FluenzR, Gulliver, Le livre |
| About | "J'aurais mis 2 ans à lancer FluenzR. L'IA m'en a pris 6 mois." |
| CTA | Découvrir FluenzR / Me contacter |

## Commandes utiles

```bash
# Dev local
cd gilleshelleu && npm install && npm run dev

# Build statique
npm run generate   # → .output/public/

# Docker local
docker compose up --build
```

## Déployer

```bash
git push origin main
deploy/deployer.sh            # déploiement réel
deploy/deployer.sh --a-blanc  # essai à blanc : build + vérifs, rien n'est écrit sur lemeon2
```

Plus de GitHub Actions depuis le 21/09/2026 (incident de facturation GitHub qui bloque
les workflows sur `ubuntu-latest` sans rien signaler — un push est accepté, rien ne se
déploie). `deploy/deployer.sh` reprend ce que faisait `.github/workflows/deploy.yml`,
lancé à la main :

1. Vérifie que `main` est propre et identique à `origin/main`.
2. Construit le site **sur le poste de dev** (`npm ci && npm run generate`) — jamais un
   build Node sur lemeon2 : 2 vCPU, sites clients dessus, un build Node dans l'image a
   déjà gelé le serveur 70 min le 05/09/2026.
3. Envoie le résultat par `rsync` dans une release horodatée
   (`/var/www/gilleshelleu/html/releases/<horodatage>-<sha>/`).
4. Bascule en repointant le symlink `html/current` (atomique, `ln -sfn` + `mv -T`, sous
   `deploy-guard`). Le conteneur nginx monte tout le dossier `html/` en volume une fois
   pour toutes (`docker-compose.yml`) : retargeter le symlink à l'intérieur de ce volume
   est visible immédiatement, sans recréer le conteneur ni risquer une bascule à moitié
   servie.
5. Ne reconstruit une image Docker que si `Dockerfile`/`nginx.conf`/`docker-compose.yml`
   (service web) ou `api/` (service api) ont changé depuis le commit précédemment
   déployé — un site perso n'a pas besoin de rebuilder nginx à chaque post. Un build
   resté nécessaire est bridé (`DOCKER_BUILDKIT=0`, `--cpu-quota=100000 --memory=3g`),
   comme AdminPanel, et passe par `deploy-guard` (verrou global lemeon2, sérialise tous
   les projets).
6. Contrôle final : `https://gilleshelleu.com/` répond 200 ET la page contient le titre
   attendu — pas juste un code HTTP.

**Retour arrière** : la release précédente reste sur le disque
(`html/releases/<ancienne>`, 5 dernières conservées). Le script affiche son nom à la
bascule ; pour y revenir :
```bash
ssh lemeon2 "cd /var/www/gilleshelleu && ln -sfn releases/<ancienne> html/current.tmp && mv -Tf html/current.tmp html/current"
```

## Setup serveur (déjà fait, pour référence)

```bash
# Sur lemeon2
mkdir -p /var/www/gilleshelleu
cd /var/www/gilleshelleu
git clone git@github.com:gillesah/gilleshelleu.git .

# SSL (après DNS Cloudflare pointé vers lemeon2)
certbot --nginx -d gilleshelleu.com -d www.gilleshelleu.com
```

## Pièges

- lemeon2 : 2 vCPU, héberge des sites clients ; ne jamais lancer `npm run generate` ou un
  `docker build` non bridé sur le serveur.
- Le service `api` (formulaire de contact) lit `/var/www/gilleshelleu/.env` sur le
  serveur (SMTP), hors git — ne pas y toucher depuis le déploiement.
- `html/current` est un symlink : ne jamais faire `docker compose down/up --build` à la
  main sans passer par le script, ça reconstruirait l'image avec l'ancien Dockerfile en
  tête si le `git pull` n'a pas eu lieu avant.

## Design (à venir)

- Palette : noir (#0a0a0a) / blanc cassé (#fafafa) / gris
- Typographie : Inter
- Inspiration : Steven Bartlett (bold typography, sections aérées)
- Option fond : œuvre de Soulages (à explorer)
