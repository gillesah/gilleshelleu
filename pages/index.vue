<template>
  <div>

    <!-- Nav -->
    <nav :class="{ 'menu-open': menuOpen }">
      <a href="/" class="nav-logo">GILLESHELLEU</a>
      <button class="burger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <!-- Menu overlay -->
    <div class="menu-overlay" :class="{ active: menuOpen }" @click="menuOpen = false">
      <ul>
        <li><a href="#projects" @click="menuOpen = false">Projets</a></li>
        <li><a href="#about" @click="menuOpen = false">Parcours</a></li>
        <li><a href="#contact" @click="menuOpen = false">Contact</a></li>
        <li><a href="https://app.fluenzr.co" target="_blank" @click="menuOpen = false">FluenzR →</a></li>
      </ul>
    </div>

    <!-- Hero -->
    <section class="hero">
      <p class="hero-label">Entrepreneur · IA · Fondateur</p>
      <h1>L'IA <em>libère</em><br>votre temps.<br>Je vous montre<br>comment.</h1>
      <div class="hero-bottom">
        <p class="hero-tagline">
          Des outils concrets. Des workflows réels. Des heures récupérées chaque semaine.
          <br>Pas de théorie — ce que j'applique moi-même dans mes projets.
        </p>
        <div class="hero-cta">
          <a href="https://app.fluenzr.co" target="_blank" class="btn-primary">Essayer FluenzR</a>
          <a href="#projects" class="btn-secondary">Voir ce que je construis</a>
        </div>
      </div>
    </section>

    <!-- Marquee -->
    <div class="marquee-section" aria-hidden="true">
      <div class="marquee-track">
        <span class="marquee-item">FluenzR</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">BskyGrowth</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">Gulliver</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">Le Livre</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">IA pour Entrepreneurs</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">FluenzR</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">BskyGrowth</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">Gulliver</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">Le Livre</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">IA pour Entrepreneurs</span>
        <span class="marquee-item">·</span>
      </div>
    </div>

    <!-- Projets -->
    <section id="projects" class="section">
      <div class="section-header">
        <span class="section-number">01 — Ce que je construis</span>
        <h2 class="section-title">Projets</h2>
      </div>
      <div class="projects-grid">
        <a href="https://fluenzr.co" target="_blank" class="project-card">
          <span class="project-tag">SaaS · Email · IA</span>
          <h3>FluenzR</h3>
          <p>Email marketing B2B augmenté par l'IA. Séquences automatiques, prospection intelligente, délivrabilité optimisée. L'outil que j'aurais voulu avoir avant de le créer.</p>
          <span class="project-link">fluenzr.co</span>
        </a>
        <a href="https://bskygrowth.com" target="_blank" class="project-card">
          <span class="project-tag">SaaS · Réseau social · Growth</span>
          <h3>BskyGrowth</h3>
          <p>Mon premier SaaS. Outils de growth pour Bluesky — le réseau social décentralisé en plein essor. Croître une audience, automatiser l'engagement.</p>
          <span class="project-link">bskygrowth.com</span>
        </a>
        <div class="project-card">
          <span class="project-tag">Agent IA · Automatisation</span>
          <h3>Gulliver</h3>
          <p>Mon robot IA personnel en production 24h/24. Il publie sur LinkedIn, trie mes emails, prospecte sur Apollo et gère mes crons. Je dors, il travaille.</p>
          <span class="project-link">En production</span>
        </div>
        <div class="project-card">
          <span class="project-tag">En cours · 2026</span>
          <h3>Le Livre</h3>
          <p>Comment les entrepreneurs peuvent multiplier leur productivité avec l'IA — les outils, les méthodes, les pièges à éviter. Tout ce que j'ai appris en construisant mes projets.</p>
          <span class="project-link">Bientôt</span>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="section">
      <div class="section-header">
        <span class="section-number">02 — Mon parcours</span>
        <h2 class="section-title">15 ans de terrain<br>avant l'IA</h2>
      </div>
      <div class="about-grid">
        <div class="about-text">
          <p>
            Avant de coder des SaaS et de construire des agents IA, j'ai passé
            <strong>15 ans dans la communication digitale.</strong>
            Chef de projet, consultant UX, responsable d'équipes — j'ai appris
            à comprendre les vrais problèmes des organisations avant d'en construire les solutions.
          </p>
          <p>
            J'ai fondé <strong>G.A.H. Management</strong> à Paris — une agence de management
            artistique avec 25 artistes. Ma première vraie école de l'entrepreneuriat :
            vente, gestion, communication, tout en même temps.
          </p>
          <p>
            Au <strong>Conseil Départemental de Haute-Garonne</strong>, j'ai managé
            une équipe de 8 personnes à la Direction de la Communication.
            C'est là que j'ai compris la différence entre une bonne idée et une idée qui scale.
          </p>
          <p>
            En 2021, pivot total vers le développement.
            En 2023, j'aurais mis 2 ans à lancer FluenzR.
            <strong>L'IA m'en a pris 6 mois.</strong>
            Depuis, je construis différemment — et j'aide d'autres entrepreneurs à faire pareil.
          </p>
        </div>
        <div class="timeline">
          <div class="timeline-item">
            <span class="timeline-year">2026</span>
            <div class="timeline-content">
              <strong>Le Livre</strong>
              <span>L'IA pour les entrepreneurs — en cours d'écriture</span>
            </div>
          </div>
          <div class="timeline-item">
            <span class="timeline-year">2023</span>
            <div class="timeline-content">
              <strong>FluenzR & BskyGrowth</strong>
              <span>Fondateur — SaaS construits avec l'IA</span>
            </div>
          </div>
          <div class="timeline-item">
            <span class="timeline-year">2021</span>
            <div class="timeline-content">
              <strong>Pivot développeur</strong>
              <span>Le Meon — freelance dev, Python, Kotlin</span>
            </div>
          </div>
          <div class="timeline-item">
            <span class="timeline-year">2016</span>
            <div class="timeline-content">
              <strong>Master CELSA</strong>
              <span>Management de la Communication, Paris</span>
            </div>
          </div>
          <div class="timeline-item">
            <span class="timeline-year">2008</span>
            <div class="timeline-content">
              <strong>Responsable Communication</strong>
              <span>Conseil Dép. Haute-Garonne · Pôle Média · 8 personnes</span>
            </div>
          </div>
          <div class="timeline-item">
            <span class="timeline-year">2005</span>
            <div class="timeline-content">
              <strong>G.A.H. Management</strong>
              <span>Fondateur & Gérant · Agence artistique · 25 artistes · Paris</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <div class="contact-section">
      <div class="contact-inner">
        <h2 class="contact-title">Vous voulez intégrer<br>l'IA dans<br>votre business ?</h2>
        <div class="hero-cta">
          <a href="mailto:gilles@fluenzr.co" class="btn-primary">Me contacter</a>
          <a href="https://www.linkedin.com/in/gilleshelleu" target="_blank" class="btn-secondary">LinkedIn</a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer>
      <p>© 2026 Gilles Helleu</p>
      <p><a href="https://fluenzr.co">FluenzR</a> · <a href="mailto:gilles@fluenzr.co">gilles@fluenzr.co</a></p>
    </footer>

  </div>
</template>

<script setup lang="ts">
const menuOpen = ref(false)

useSeoMeta({
  title: 'Gilles Helleu — Entrepreneur, IA & Fondateur de FluenzR',
  description: 'L\'IA libère votre temps. Je vous montre comment. Fondateur de FluenzR et BskyGrowth, auteur en cours.',
  ogTitle: 'Gilles Helleu — L\'IA libère votre temps.',
  ogDescription: 'Des outils concrets, des workflows réels. Ce que j\'applique moi-même dans mes projets.',
})
</script>
