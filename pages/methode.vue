<template>
  <div>
    <!-- Nav -->
    <nav :class="{ 'menu-open': menuOpen }">
      <a href="/" class="nav-logo">GILLES HELLEU</a>
      <button class="burger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <div class="menu-overlay" :class="{ active: menuOpen }" @click="menuOpen = false">
      <ul>
        <li><a href="/#projects" @click="menuOpen = false">Projets</a></li>
        <li><a href="/methode" @click="menuOpen = false">Méthode</a></li>
        <li><a href="/cv" @click="menuOpen = false">CV</a></li>
        <li><a href="/#contact" @click="menuOpen = false">Contact</a></li>
      </ul>
    </div>

    <!-- Hero -->
    <section class="project-hero">
      <a href="/" class="back-link">← Retour à l'accueil</a>
      <span class="project-tag">Méthode de travail</span>
      <h1>Comment je<br>construis<br>avec l'IA.</h1>
      <p class="project-pitch">
        Je ne "discute" pas avec l'IA projet par projet : je pilote des agents de code (Claude Code)
        avec un contexte écrit, des rôles spécialisés et des garde-fous automatiques. Voici l'outillage
        réel, pas la théorie.
      </p>
    </section>

    <!-- Contexte par projet -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">01 — Contexte</span>
        <h2 class="tech-block-title">Un fichier de contexte par projet</h2>
      </div>
      <p>
        Chaque projet a son <strong style="color:var(--white)">CLAUDE.md</strong> : périmètre, où vit le
        code, les pièges qui coûtent cher. Et un <strong style="color:var(--white)">état de reprise</strong>
        (consignes en attente, ce qui tourne et où) que chaque session d'agent doit lire avant d'agir.
        Un fichier périmé transforme tout le dispositif en devinette — donc il est tenu à jour en fin de
        session, pas relu une fois par mois.
      </p>
      <p>
        Le travail est réparti en conversations durables, une par domaine (produit, comptabilité,
        communication…), chacune avec son périmètre et son état propre.
      </p>
    </section>

    <!-- Agents spécialisés -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">02 — Agents spécialisés</span>
        <h2 class="tech-block-title">Le bon modèle pour le bon enjeu</h2>
      </div>
      <p style="margin-bottom: 32px;">
        Six agents définis avec un rôle et un modèle fixés en amont — le modèle le plus coûteux est
        réservé au jugement qui en a vraiment besoin, pas utilisé par défaut.
      </p>
      <div class="methode-grid">
        <div class="methode-card" v-for="agent in agents" :key="agent.name">
          <span class="methode-card-model">{{ agent.model }}</span>
          <span class="methode-card-title">{{ agent.name }}</span>
          <p>{{ agent.role }}</p>
        </div>
      </div>
    </section>

    <!-- Hooks -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">03 — Garde-fous automatiques</span>
        <h2 class="tech-block-title">Des hooks, pas des bonnes intentions</h2>
      </div>
      <ul class="list-clean">
        <li>Début et fin de session : un hook trace le cycle de vie du travail en cours, pour qu'aucune session ne se perde sans laisser de trace.</li>
        <li>Avant chaque action d'outil : un hook vérifie qu'elle reste dans le périmètre défini.</li>
        <li>Après chaque écriture de fichier : le formateur du projet se lance automatiquement.</li>
        <li>10 commandes personnalisées (commit, revue de code, simplification, vérification, communication…) pour standardiser les gestes répétés plutôt que les refaire à la main à chaque fois.</li>
      </ul>
    </section>

    <!-- Revue humaine -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">04 — Revue humaine</span>
        <h2 class="tech-block-title">Ce que je vérifie moi-même</h2>
      </div>
      <p>
        L'agent propose, je tranche sur l'architecture et la sécurité — jamais l'inverse. Un build vert
        n'est pas une preuve que ça marche : je vérifie à l'écran, pas seulement dans les logs.
      </p>
      <p>
        Je documente ce qui casse, pas seulement ce qui marche : une faille d'authentification repérée en
        revue de code, des déploiements bloqués sans alerte par un incident de facturation d'un service
        CI tiers, un modèle qui cassait un tiers des réponses JSON avant l'adoption des sorties
        structurées — et ce que chacun de ces incidents a changé dans la méthode, pas seulement dans le
        code.
      </p>
    </section>

    <!-- Pilotage -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">05 — Pilotage</span>
        <h2 class="tech-block-title">Multi-projets, un seul tableau de bord</h2>
      </div>
      <p>
        Un pilotage centralisé agrège les audits et le journal des correctifs de tous les projets. Un
        back-office interne (Nuxt) centralise déploiements, tickets, cron et métriques de plusieurs
        produits en un seul endroit — pour ne pas avoir à ouvrir cinq outils pour savoir où en est chaque
        chantier.
      </p>
    </section>

    <section class="project-nav-footer">
      <a href="/" class="btn-secondary">← Retour à l'accueil</a>
      <a href="/cv" class="btn-primary">Voir le CV →</a>
    </section>

    <footer>
      <p>© 2026 Gilles Helleu</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const menuOpen = ref(false)

const agents = [
  { name: 'architect', model: 'Sonnet', role: "Design d'architecture pour les nouvelles fonctionnalités complexes." },
  { name: 'build-validator', model: 'Haiku', role: 'Valide lint, types, tests et build avant tout commit ou PR.' },
  { name: 'debugger', model: 'Sonnet', role: 'Cherche la cause racine d\'un bug (méthode des 5 pourquoi).' },
  { name: 'security-reviewer', model: 'Opus', role: 'Audit de sécurité orienté OWASP Top 10 — le modèle le plus fort, réservé au jugement adverse.' },
  { name: 'code-simplifier', model: 'Haiku', role: 'Nettoyage et simplification après implémentation.' },
  { name: 'seo-checker', model: 'Haiku', role: 'Vérifie les erreurs SEO sur les pages publiques.' },
]

useSeoMeta({
  title: 'Comment je construis avec l\'IA — Gilles Helleu',
  description: 'CLAUDE.md par projet, agents Claude Code spécialisés, hooks garde-fous, revue humaine centrée sur l\'architecture et la sécurité : la méthode réelle derrière ForgR, FluenzR, CIICIR et les autres projets.',
  ogTitle: 'Comment je construis avec l\'IA — Gilles Helleu',
  ogDescription: 'L\'outillage réel derrière mes SaaS : agents spécialisés, hooks, revue humaine.',
})
</script>
