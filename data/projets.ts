export interface StackCategory {
  label: string
  items: string[]
}

export interface Projet {
  slug: string
  tag: string
  title: string
  pitch: string
  publicUrl?: { label: string; href: string }
  repoUrl?: { label: string; href: string }
  stack: StackCategory[]
  architecture: string[]
  ia: string[]
  qualite: string[]
  deploiement: string[]
  securite: string[]
  appris: { label: string; text: string }
}

export const projets: Projet[] = [
  {
    slug: 'forgr',
    tag: 'SaaS · SEO · IA',
    title: 'ForgR',
    pitch: "ForgR crée et fait vivre des blogs SEO pour des agences et des indépendants, puis mesure si ces contenus sont cités par les IA génératives comme ChatGPT, Perplexity ou Claude. Un thème est déposé, l'IA rédige et publie, l'outil montre ce qui marche.",
    publicUrl: { label: 'forgr.co', href: 'https://forgr.co' },
    stack: [
      { label: 'Backend', items: ['Kotlin', 'Spring Boot 3.2', 'Architecture DDD', 'PostgreSQL', 'Flyway'] },
      { label: 'Frontend', items: ['Dashboard : Vite + Vue 3 + TypeScript + Tailwind', 'Site marketing : Nuxt 3 (SSG), i18n FR/EN'] },
      { label: 'Paiement', items: ['Stripe'] },
      { label: 'Hébergement des sites générés', items: ['Cloudflare R2 + Worker', 'Apache', 'WordPress externe via API REST'] },
    ],
    architecture: [
      "Le dashboard (Vue) pilote une API Kotlin/Spring en architecture DDD (domaine, application, infrastructure, partagé). Chaque blog généré est publié selon trois modes selon le client : site statique sur Cloudflare R2 derrière un Worker, service direct par un Apache, ou publication dans un WordPress existant via API REST.",
    ],
    ia: [
      "Un client Anthropic dédié pilote plusieurs services spécialisés : assistant de rédaction (« Léa »), suggestion d'idées de site, création automatisée de site, réécriture de titres pour le SEO, et « Gaïa » qui mesure si la marque du client est citée par les IA génératives (avec recherche web intégrée).",
      "Le pipeline de génération de contenu a ses propres garde-fous : validation de la qualité des articles, contrôle de niche et de sujet, alignement avec la marque du client, avant publication.",
      "Le coût de chaque appel IA est suivi individuellement (client, agent, montant) pour garder de la visibilité sur la rentabilité produit.",
    ],
    qualite: [
      '186 fichiers de test côté backend',
      "Tests end-to-end Playwright contre un environnement de préproduction, sans mock : pilotage de l'interface comme un humain, vérification de l'état réel (base de données, site publié, WordPress)",
    ],
    deploiement: [
      "Déploiement blue-green sans coupure : deux instances tournent en parallèle, le trafic ne bascule qu'après un contrôle de santé, avec verrou de déploiement global et limites CPU/RAM pendant le build.",
      "Le déploiement se fait par un script lancé en SSH depuis le poste de développement, pas par un orchestrateur cloud tiers.",
    ],
    securite: [
      "Authentification OAuth Google pour l'intégration Search Console",
      'Limitation de débit (rate limiting) sur les points d\'entrée sensibles',
      "Garde-fous anti-hallucination sur tout le pipeline de génération de contenu",
    ],
    appris: {
      label: "Ce qui a cassé, ce que j'ai appris",
      text: "Le premier modèle utilisé pour générer les articles cassait environ un tiers des réponses en JSON invalide. Plutôt que d'empiler des validations et des retries après coup, j'ai changé de modèle pour un qui supporte nativement les sorties structurées (structured outputs) — le problème a disparu à la source. Le suivi du coût IA par client et par agent est venu du même réflexe : préférer une contrainte au niveau de l'architecture à une pile de correctifs.",
    },
  },
  {
    slug: 'fluenzr',
    tag: 'SaaS · Email · IA',
    title: 'FluenzR',
    pitch: "FluenzR est un CRM d'e-mailing et de prospection B2B : campagnes, boîte de réception intégrée, et un moteur de « chauffe » qui construit la réputation des comptes d'envoi avant de les solliciter en masse.",
    publicUrl: { label: 'fluenzr.co', href: 'https://fluenzr.co' },
    stack: [
      { label: 'Backend', items: ['Kotlin', 'Spring Boot 3.4', 'PostgreSQL 15', 'Redis 7', 'RabbitMQ 3', 'Docker'] },
      { label: 'Frontend', items: ['Vite + Vue 3 + TypeScript + Tailwind', 'Pinia'] },
      { label: 'Auth', items: ['Spring OAuth2 (authorization + resource server)', 'JWT'] },
      { label: 'Paiement & emailing', items: ['Stripe', 'Thymeleaf (templates email)'] },
    ],
    architecture: [
      "Le moteur de chauffe (warming) fait s'échanger des emails entre comptes pair-à-pair pour construire leur réputation avant l'envoi de campagnes en masse. RabbitMQ découple l'envoi du traitement, Redis sert de cache et de file rapide.",
      "Trois familles de comptes email sont gérées de bout en bout : SMTP, Gmail (OAuth 2.0 + Gmail API) et Microsoft (Graph API).",
    ],
    ia: [
      "Un service Anthropic dédié alimente plusieurs cas d'usage : chat d'assistant de marque, génération de workflows de campagne, génération d'icebreakers (accroches personnalisées) pour la prospection.",
      "Le produit expose son propre serveur MCP, avec authentification OAuth 2.1 complète (authorization server + resource server), pour que des agents IA externes pilotent directement les contacts, les campagnes et le tableau de bord — pas un simple client MCP, un serveur.",
    ],
    qualite: [
      '95 fichiers de test backend, dont une suite dédiée au moteur de chauffe (coupe-circuit, quota journalier, passage de journée)',
      '17 specs E2E / frontend',
      'Environnement de préproduction séparé, avec OAuth Google volontairement désactivé pour ne pas modifier le périmètre validé par l\'audit de sécurité',
    ],
    deploiement: [
      'Conteneurs Docker (backend, Postgres, Redis, RabbitMQ), déploiement par script depuis le poste de développement.',
    ],
    securite: [
      'OAuth Gmail et Microsoft pour les comptes email connectés',
      'Jetons OAuth chiffrés AES-256-GCM en base',
      'Validation Google CASA Tier 2 (audit de sécurité tiers, 2025) — condition posée par Google pour autoriser l\'accès à l\'API Gmail en production',
    ],
    appris: {
      label: "Ce qui a cassé, ce que j'ai appris",
      text: "La première demande de vérification OAuth auprès de Google a été rejetée : le moteur de chauffe utilisait les scopes Gmail au-delà de ce qui était déclaré. Correctifs, nouvelle réponse formelle, validation obtenue ensuite. La certification CASA impose une recertification annuelle — c'est un statut à renouveler activement, pas un acquis permanent.",
    },
  },
  {
    slug: 'ciicir',
    tag: 'SaaS · Fiscalité · IA',
    title: 'CIICIR',
    pitch: "CIICIR construit, tout au long de l'année, le dossier justificatif du Crédit d'Impôt Recherche et du Crédit d'Impôt Innovation à partir des traces réelles de travail — puis génère la demande de rescrit fiscal.",
    publicUrl: { label: 'ciicir.fr', href: 'https://ciicir.fr' },
    stack: [
      { label: 'Backend', items: ['Kotlin', 'Spring Boot 3.4', 'Architecture DDD', 'PostgreSQL 15', 'Flyway', 'JWT'] },
      { label: 'Frontend app', items: ['Vue 3 + TypeScript + Vite + Tailwind'] },
      { label: 'Site & blog', items: ['Nuxt 3 + @nuxt/content'] },
      { label: 'Paiement', items: ['Stripe'] },
    ],
    architecture: [
      "Le parcours de rédaction du dossier CIR/CII est découpé en étapes, chacune confiée à un agent IA spécialisé plutôt qu'à un seul flux monolithique.",
    ],
    ia: [
      "Un client Anthropic dédié pilote 7 « conducteurs » IA spécialisés, un par étape du parcours : cadrage, rédaction, conseil, vérification finale, présentation de la société, entre autres — environ 2800 lignes au total, modèle configurable par conducteur, avec son propre fichier de test.",
      "C'est un pipeline multi-étapes piloté par plusieurs agents spécialisés, pas un seul appel générique à un modèle.",
    ],
    qualite: [
      '63 fichiers de test backend',
      '13 specs unitaires Vitest et 4 specs E2E Playwright côté frontend',
    ],
    deploiement: [
      "Un script unique fait systématiquement tourner le gate de tests (backend Gradle, frontend Vitest, build, audit de dépendances) avant tout déploiement, sur préproduction comme sur le site — rien ne part sur du rouge.",
      "La cible de déploiement groupé exclut volontairement la production, pour ne jamais confondre un déploiement fréquent (préproduction + site) avec un déploiement rare et sensible (production).",
    ],
    securite: [
      'JWT, Flyway pour les migrations versionnées',
      'Gate de tests obligatoire avant toute mise en ligne',
    ],
    appris: {
      label: "Ce qui a cassé, ce que j'ai appris",
      text: "Le déploiement dépendait de GitHub Actions jusqu'à un incident de facturation GitHub qui a bloqué des workflows sans aucune alerte visible : un push était accepté par git, le job échouait en silence sur l'attribution du runner, et rien ne partait. Le script de déploiement a remplacé l'orchestrateur cloud par un point d'entrée local, avec le même gate de tests — sans dépendre d'un service tiers pour savoir si le code est prêt à partir en production.",
    },
  },
  {
    slug: 'timalio',
    tag: 'SaaS · Réseaux sociaux · IA',
    title: 'Timalio',
    pitch: "Timalio programme des publications sur plusieurs réseaux sociaux avec un circuit de validation avant mise en ligne — pensé aussi pour qu'un agent IA planifie lui-même des posts via une API.",
    publicUrl: { label: 'timalio.com', href: 'https://timalio.com' },
    stack: [
      { label: 'App', items: ['Nuxt 3', 'Vue 3', 'Vitest'] },
      { label: 'Site vitrine', items: ['Nuxt 3, bilingue EN/FR sans dépendance i18n'] },
      { label: 'Infra', items: ['Conteneurs Docker', 'Build en CI sur runner auto-hébergé'] },
    ],
    architecture: [
      "API REST classique côté produit, doublée d'un serveur MCP pour que des agents IA programment des publications directement — même logique métier, deux points d'accès : l'interface pour un humain, MCP pour un agent.",
    ],
    ia: [
      "Serveur MCP exposé par le produit pour la programmation de posts par des agents IA.",
      "Intégrations réseaux confirmées en production : Mastodon, avec un test réel sur Bluesky.",
      "Une application mobile est en cours de développement.",
    ],
    qualite: [
      '174 fichiers de test Vitest côté application',
      '14 fichiers de test côté site vitrine',
    ],
    deploiement: [
      "Build effectué en CI sur un runner auto-hébergé plutôt que sur un runner cloud partagé.",
    ],
    securite: [
      'Plusieurs revues de sécurité dédiées',
      'Politique CSP appliquée en production',
      'Correctif d\'un TOCTOU (time-of-check to time-of-use) sur une action de gestion des posts',
    ],
    appris: {
      label: "Ce qui a cassé, ce que j'ai appris",
      text: "Un build Docker lancé en local a gelé la machine de production pendant 70 minutes, avec les autres sites qu'elle héberge. Le build est passé sur un runner CI auto-hébergé, séparé de la machine de production, pour qu'une compilation ne puisse plus jamais bloquer ce qui tourne dessus.",
    },
  },
  {
    slug: 'gulliver',
    tag: 'Agent IA personnel · Open source',
    title: 'Gulliver',
    pitch: "Gulliver est mon agent IA personnel, en production 24h/24 : il trie mes emails, publie sur les réseaux sociaux, prospecte, gère mes tâches planifiées, et je le pilote depuis Telegram.",
    repoUrl: { label: 'github.com/gillesah/openNoClaw', href: 'https://github.com/gillesah/openNoClaw' },
    stack: [
      { label: 'Backend', items: ['Python 3.11', 'FastAPI + uvicorn', 'WebSockets'] },
      { label: 'IA', items: ["Anthropic SDK pour le chat conversationnel (pay-per-token)", 'Claude Code CLI piloté en sous-processus pour les tâches agentiques (crons, skills)'] },
      { label: 'Automatisation', items: ['Playwright Chromium headless', 'APScheduler', 'python-telegram-bot'] },
      { label: 'Infra', items: ['Docker + docker-compose', 'Tunnel Cloudflare'] },
    ],
    architecture: [
      "Deux façons de mobiliser l'IA selon le besoin : l'API Anthropic en direct pour le chat conversationnel, et le CLI Claude Code piloté en sous-processus pour les tâches agentiques plus longues. Une architecture multi-agents fait tourner plusieurs instances Claude Code en parallèle, avec suivi d'usage.",
    ],
    ia: [
      "Des skills dédiés s'ajoutent au fil des besoins : réseaux sociaux, génération de vidéo, rédaction d'articles SEO, prospection.",
      "Le pilotage de plusieurs agents en parallèle a imposé un suivi d'usage précis dès le départ — sans lui, impossible de savoir quel agent consomme quoi.",
    ],
    qualite: [
      'Conteneurisé, exposé via un tunnel Cloudflare',
      'Scheduling par cron applicatif (APScheduler) pour les tâches récurrentes',
    ],
    deploiement: [
      'Docker + docker-compose sur un serveur dédié, redémarrage et mise à jour par script.',
    ],
    securite: [
      "Intégration Telegram comme canal de commande, avec les mêmes principes de garde que les autres projets : contexte explicite par tâche, pas d'action irréversible sans confirmation.",
    ],
    appris: {
      label: "Ce qui a cassé, ce que j'ai appris",
      text: "C'est le projet où l'orchestration multi-agents s'est construite le plus par itération : chaque agent a son périmètre, son modèle choisi selon l'enjeu, et un état de reprise écrit pour que la session suivante n'ait pas à deviner ce qui a déjà été fait.",
    },
  },
]

export function getProjet(slug: string): Projet | undefined {
  return projets.find((p) => p.slug === slug)
}
