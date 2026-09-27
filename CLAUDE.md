# gilleshelleu.com — Site personnel de Gilles

## Stack

- **Nuxt 3** en mode SSG (`nuxt generate`)
- **Hébergement** : **Cloudflare Pages** depuis le 27/09/2026 (bascule depuis lemeon2),
  projet `gilleshelleu`, compte perso de Gilles (`103628de3cfa2d51c0fe0c74fdf2d60c`,
  « Helleugilles@gmail.com's Account »). Direct upload (`wrangler pages deploy`), pas de
  connexion GitHub.
- **Formulaire de contact** : resté à part, sur **lemeon2** (`ssh lemeon2`, dossier
  `/var/www/gilleshelleu`) — conteneur `api` (Express + nodemailer, SMTP = Gmail avec mot
  de passe d'application), exposé sur **api.gilleshelleu.com**. Une Pages Function n'aurait
  pas pu faire du SMTP Gmail simplement ; garder l'API existante derrière un sous-domaine
  était la solution la plus simple, sans coût nouveau.
- **CI/CD** : `deploy/deployer.sh` (Cloudflare Pages, script courant), lancé à la main
  depuis le poste. `deploy/deployer-lemeon2.sh` = ancien script, gardé pour redéployer
  l'API contact sur lemeon2 (voir « Filet lemeon2 » ci-dessous).
- **Domaine** : gilleshelleu.com (Cloudflare Registrar + zone Cloudflare)
- **SSL** : Cloudflare Universal SSL (edge) pour le site ; Certbot sur lemeon2 pour
  `api.gilleshelleu.com` (TLS entre Cloudflare et l'origine)

## Positionnement

> "Je construis avec l'IA. Je n'en parle pas — je l'utilise."

Gilles est entrepreneur, fondateur de FluenzR, auteur en cours. Il se positionne comme **référence pour les entrepreneurs qui veulent intégrer l'IA dans leur business** — pas en théorie, sur le terrain.

## Structure des pages

```
/ (index)          → Hero + 6 projets (ForgR, FluenzR, CIICIR, Timalio, BskyGrowth, Gulliver) + About + Contact
/projets/[slug]    → détail technique par projet (forgr, fluenzr, ciicir, timalio, gulliver — BskyGrowth pointe direct vers bskygrowth.com, pas de page détail)
/methode           → méthode de travail
/cv                → CV en ligne (sans téléchargement PDF)
```

Routes dynamiques `/projets/*` prérendues explicitement (`nitro.prerender.routes` dans
`nuxt.config.ts`) — un nouveau projet ajouté dans `pages/projets/[slug].vue` doit aussi
être ajouté à cette liste, sinon la page n'existe pas dans le build statique.

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
deploy/deployer.sh            # déploiement réel (Cloudflare Pages)
deploy/deployer.sh --a-blanc  # essai à blanc : build + vérifs, rien n'est publié
```

`deploy/deployer.sh` (réécrit le 27/09/2026 pour la bascule Cloudflare Pages) :

1. Vérifie que `main` est propre et identique à `origin/main`.
2. Construit le site **sur le poste de dev** (`npm ci && npm run generate`).
3. Publie `.output/public` par `wrangler pages deploy` (direct upload, projet
   `gilleshelleu`). Jeton lu dans le coffre (`cloudflare.pages_token`), jamais affiché.
   Un déploiement Pages est **atomique par nature** : chaque déploiement est une version
   immuable, la bascule en production est instantanée, jamais de site à moitié servi.
4. Contrôle final : `https://gilleshelleu.com/` (titre attendu) + `/methode`, `/cv`,
   `/projets/forgr`, `/projets/fluenzr`, `/projets/ciicir`, `/projets/timalio`,
   `/projets/gulliver` en 200.

**Retour arrière** (déploiement Pages jamais écrasé, donc pas de « release précédente »
à restaurer comme sur lemeon2) :
- Dashboard Cloudflare → Workers & Pages → `gilleshelleu` → Deployments → sur l'ancien
  déploiement voulu → **« Rollback to this deployment »** (bascule instantanée).
- CLI, pour lister : `wrangler pages deployment list --project-name gilleshelleu`
  (chaque déploiement reste accessible à `<hash>.gilleshelleu.pages.dev`). Pour
  repromouvoir un ancien commit sans le dashboard : `git checkout <ancien-commit>` puis
  relancer `deploy/deployer.sh`.

## Filet lemeon2 (à arrêter le 04/10/2026)

Le conteneur **web** de lemeon2 (nginx servant l'ancien site statique) reste allumé
**7 jours après la bascule du 27/09/2026, jusqu'au 04/10/2026**, comme filet — pas
d'usage prévu (le domaine ne pointe plus dessus), à arrêter/supprimer à cette date si
tout va bien sur Pages :
```bash
ssh lemeon2 "cd /var/www/gilleshelleu && docker compose stop web"
```
Le conteneur **api** (formulaire de contact) reste, lui, **indéfiniment** — c'est le
backend réel de `api.gilleshelleu.com`. Pour le redéployer (ex. modif du formulaire) :
```bash
deploy/deployer-lemeon2.sh            # déploiement réel sur lemeon2 (web + api)
deploy/deployer-lemeon2.sh --a-blanc  # essai à blanc
```
C'est l'ancien script (renommé), qui construit `.output/public` et le pousse aussi vers
lemeon2 par rsync + bascule de symlink + rebuild Docker conditionnel — inchangé sinon.

## Setup Cloudflare Pages (déjà fait, pour référence)

```bash
npm i -D wrangler   # dépendance locale du projet, pas globale

# Création du projet (direct upload, --force pour éviter la délégation
# "Workers" de wrangler qui tente d'auto-détecter un build Nuxt et échoue
# sur cette version de Nuxt)
CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=103628de3cfa2d51c0fe0c74fdf2d60c \
  npx wrangler pages project create gilleshelleu --production-branch main --force

# Domaines custom (pas de sous-commande wrangler pour ça, API directe)
# POST /accounts/{account}/pages/projects/gilleshelleu/domains {"name": "gilleshelleu.com"}
# POST .../domains {"name": "www.gilleshelleu.com"}
# Puis DNS : remplacer les A records existants par des CNAME vers
# gilleshelleu.pages.dev (Cloudflare ne les écrase pas tout seul s'il y avait déjà
# un enregistrement — message d'erreur "CNAME record not set" sinon).
```

Jeton dédié `cloudflare.pages_token` (coffre `~/ghdev/.secrets.json`), permissions :
`Account > Cloudflare Pages : Edit`, `Zone > DNS : Edit` limité à gilleshelleu.com,
`Account > Account Settings : Read`. Les jetons ForgR existants
(`cloudflare.registrar_token`, `cloudflare.analytics_token`) n'ont pas les droits Pages.

## Setup serveur lemeon2 — filet + API contact (déjà fait, pour référence)

```bash
# Sur lemeon2
mkdir -p /var/www/gilleshelleu
cd /var/www/gilleshelleu
git clone git@github.com:gillesah/gilleshelleu.git .

# SSL du site (avant la bascule Pages, DNS pointait sur lemeon2)
certbot --nginx -d gilleshelleu.com -d www.gilleshelleu.com

# Sous-domaine api.gilleshelleu.com (créé le 27/09/2026) : vhost nginx minimal en
# HTTP d'abord (pour que le challenge certbot passe), puis certbot --nginx, puis
# remplacement du "location / { return 404; }" par un proxy_pass vers
# 127.0.0.1:3001 (port publié par docker-compose.yml, service api).
certbot --nginx -d api.gilleshelleu.com --account <id-compte-existant>
```

## Pièges

- Le front (`pages/index.vue`) appelle **l'URL absolue** `https://api.gilleshelleu.com/api/contact`,
  pas `/api/contact` : Cloudflare Pages n'a pas cette route (pas de Pages Function), l'API
  vit ailleurs (lemeon2). Un retour à une URL relative casserait le formulaire en silence
  (échec réseau, pas d'erreur de build).
- L'API (`api/server.js`) n'autorise en CORS que `https://gilleshelleu.com` et
  `https://www.gilleshelleu.com` (liste en dur, `ALLOWED_ORIGINS`). Un test du formulaire
  depuis une URL `*.pages.dev` de prévisualisation échouera par design (CORS) — tester le
  endpoint directement (curl avec `Origin: https://gilleshelleu.com`), pas depuis le
  navigateur sur l'URL de preview.
- lemeon2 : 2 vCPU, héberge des sites clients ; ne jamais lancer `npm run generate` ou un
  `docker build` non bridé sur le serveur.
- Le service `api` (formulaire de contact) lit `/var/www/gilleshelleu/.env` sur le
  serveur (SMTP Gmail), hors git — ne pas y toucher depuis le déploiement.
- `html/current` est un symlink : ne jamais faire `docker compose down/up --build` à la
  main sans passer par `deploy/deployer-lemeon2.sh`, ça reconstruirait l'image avec
  l'ancien Dockerfile en tête si le `git pull` n'a pas eu lieu avant.
- `api.gilleshelleu.com` : vhost nginx hôte `/etc/nginx/conf.d/api.gilleshelleu.com.conf`
  sur lemeon2, certbot séparé (`/etc/letsencrypt/live/api.gilleshelleu.com/`), proxy vers
  `127.0.0.1:3001` (port publié par `docker-compose.yml`, service `api`). Si le conteneur
  `api` est arrêté, ce vhost renverra une erreur de connexion — ne pas arrêter `api` sans
  couper aussi ce qui en dépend.

## Design (à venir)

- Palette : noir (#0a0a0a) / blanc cassé (#fafafa) / gris
- Typographie : Inter
- Inspiration : Steven Bartlett (bold typography, sections aérées)
- Option fond : œuvre de Soulages (à explorer)
