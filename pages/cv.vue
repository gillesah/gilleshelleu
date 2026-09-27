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
      <span class="project-tag">Full Stack Builder · IA agentique</span>
      <h1>Gilles Helleu</h1>
      <p class="project-pitch">
        Toulouse · télétravail · gilleshelleu.com · github.com/gillesah
      </p>
      <div class="cv-actions">
        <a href="/#contact" class="btn-secondary">Me contacter</a>
      </div>
    </section>

    <!-- Profil -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">Profil</span>
        <h2 class="tech-block-title">Du produit au code</h2>
      </div>
      <p>
        Quinze ans de produit digital et d'UX, puis la bascule vers le code. Depuis trois ans, je conçois,
        développe et exploite seul des applications SaaS complètes, en pilotant au quotidien des agents de
        code (Claude Code) : spécification, génération, tests, revue, déploiement. Ce que j'apporte : le
        sens du produit, la vitesse de l'IA, et la rigueur de ce qui part en production.
      </p>
    </section>

    <!-- Expérience -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">Expérience</span>
        <h2 class="tech-block-title">Parcours</h2>
      </div>

      <div class="timeline">
        <div class="timeline-item">
          <span class="timeline-year">2024 — auj.</span>
          <div class="timeline-content">
            <strong>Software Engineer — Eurecia (SIRH), Toulouse</strong>
            <span>Stage puis CDI (septembre 2024). Kotlin/Java, Vue 3 et TypeScript, RabbitMQ, MySQL.
              Développement de fonctionnalités de bout en bout, dont l'espace d'administration client
              (fiche société, départements et structures, gestion des rôles et des droits) ; optimisation
              du stockage MySQL de plusieurs fonctionnalités ; maintenance applicative (TMA) sur
              l'application historique en JSP.</span>
          </div>
        </div>

        <div class="timeline-item">
          <span class="timeline-year">2021 — auj.</span>
          <div class="timeline-content">
            <strong>Fondateur et développeur — Le Meon</strong>
            <span>Studio indépendant, en société depuis 2023. Sites clients, puis quatre SaaS conçus,
              codés et exploités de bout en bout, en production — détails techniques par projet ci-dessous.
              Exploitation : Docker Compose, VPS Linux durcis (SSH par clé, pare-feu, fail2ban), nginx,
              sauvegardes hors machine, coffre à secrets synchronisé.</span>
          </div>
        </div>

        <div class="timeline-item">
          <span class="timeline-year">2008 — 2023</span>
          <div class="timeline-content">
            <strong>Communication digitale, produit et UX</strong>
            <span>Responsable du pôle média, Conseil départemental de la Haute-Garonne (équipe de 8) ·
              consultant UX (Couleur Citron, missions Clever Age) · Senior Digital Project Manager
              (Inconito) · Linkfluence · fondateur-gérant de G.A.H. Management.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Projets Le Meon -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">Le Meon — quatre SaaS</span>
        <h2 class="tech-block-title">Le détail technique</h2>
      </div>
      <div class="pill-group">
        <NuxtLink v-for="p in projetsListe" :key="p.slug" :to="`/projets/${p.slug}`" class="pill">
          {{ p.title }} →
        </NuxtLink>
      </div>
    </section>

    <!-- Méthode -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">Comment je construis avec l'IA</span>
        <h2 class="tech-block-title">La méthode, en bref</h2>
      </div>
      <p>
        Un fichier de contexte par projet (CLAUDE.md) et un état de reprise que chaque agent lit avant
        d'agir ; des agents spécialisés choisis selon l'enjeu (revue de sécurité sur le modèle le plus
        fort, validation de build sur le plus léger) ; des hooks qui imposent les garde-fous ; revue
        humaine centrée sur l'architecture et la sécurité. Je documente ce qui casse : une faille
        d'authentification admin repérée en revue, des déploiements bloqués sans alerte par un incident
        de facturation CI, un secret renvoyé en clair par l'outillage — et ce que chacun a changé dans la
        méthode.
      </p>
      <p><NuxtLink to="/methode" style="color: var(--accent); font-weight: 600;">Le détail complet de la méthode →</NuxtLink></p>
    </section>

    <!-- Compétences -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">Compétences</span>
        <h2 class="tech-block-title">Stack</h2>
      </div>
      <div class="pill-group">
        <span class="pill" v-for="c in competences" :key="c">{{ c }}</span>
      </div>
    </section>

    <!-- Formation & certifications -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">Formation & certifications</span>
        <h2 class="tech-block-title">Repères</h2>
      </div>
      <ul class="list-clean">
        <li>Concepteur développeur d'applications (Python), bac+3 — Diginamic, 2023-2024</li>
        <li>Master Management de la communication — CELSA, 2016-2018</li>
        <li>Master Gestion et administration — Sorbonne Paris IV, 2007-2009</li>
        <li>Certifications : Google CASA Tier 2 (FluenzR, 2025) · Accessibilité web (Atalan) · Qualité web (Opquast)</li>
        <li>Langues : Français natif · Anglais B2</li>
      </ul>
    </section>

    <section class="project-nav-footer">
      <a href="/" class="btn-secondary">← Retour à l'accueil</a>
    </section>

    <footer>
      <p>© 2026 Gilles Helleu</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { projets } from '~/data/projets'

const menuOpen = ref(false)
const projetsListe = projets

const competences = [
  'Kotlin', 'Spring Boot', 'TypeScript', 'Vue 3', 'Nuxt 3', 'Python', 'FastAPI',
  'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker', 'nginx', 'Linux',
  'Playwright', 'Vitest', 'JUnit', 'Claude API, agents, MCP', 'Sorties structurées',
  'Stripe', 'OAuth 2.0 / 2.1', 'MySQL', 'Git', 'Déploiement continu par script, blue-green',
  'OWASP', 'Durcissement serveur',
]

useSeoMeta({
  title: 'CV — Gilles Helleu, Full Stack Builder IA agentique',
  description: "Parcours de Gilles Helleu : quinze ans de produit et d'UX, puis développeur full stack pilotant des agents Claude Code pour concevoir, développer et exploiter des SaaS en production.",
  ogTitle: 'CV — Gilles Helleu',
  ogDescription: 'Full Stack Builder IA agentique. Parcours, projets, méthode.',
})
</script>
