# gilleshelleu.com — Site personnel de Gilles

## Stack

- **Nuxt 3** en mode SSG (`nuxt generate`)
- **Docker** : nginx Alpine servant `.output/public`, port **8106**
- **Serveur** : lemeon2 (`ssh lemeon2`), dossier `/var/www/gilleshelleu`
- **CI/CD** : GitHub Actions → push `main` → deploy auto sur lemeon2
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

# Déploiement (auto via CI, mais si manuel)
ssh lemeon2 "cd /var/www/gilleshelleu && git pull && docker compose up -d --build"
```

## Setup serveur (à faire une fois)

```bash
# Sur lemeon2
mkdir -p /var/www/gilleshelleu
cd /var/www/gilleshelleu
git clone git@github.com:gillesah/gilleshelleu.git .

# SSL (après DNS Cloudflare pointé vers lemeon2)
certbot --nginx -d gilleshelleu.com -d www.gilleshelleu.com
```

## GitHub Secrets requis

| Secret | Valeur |
|--------|--------|
| `SERVER_HOST` | IP de lemeon2 (193.203.169.72) |
| `SERVER_USER` | gillesah |
| `SERVER_SSH_KEY` | Clé SSH privée pour lemeon2 |

## Design (à venir)

- Palette : noir (#0a0a0a) / blanc cassé (#fafafa) / gris
- Typographie : Inter
- Inspiration : Steven Bartlett (bold typography, sections aérées)
- Option fond : œuvre de Soulages (à explorer)
