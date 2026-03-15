<template>
  <div>
    <!-- Nav -->
    <nav>
      <span class="nav-logo">GH</span>
      <ul class="nav-links">
        <li><a href="#projects">Projets</a></li>
        <li><a href="#about">À propos</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <p class="hero-label">Entrepreneur · IA · Fondateur</p>
      <h1>Je construis<br>avec <em>l'IA.</em></h1>
      <div class="hero-bottom">
        <p class="hero-tagline">
          Fondateur de FluenzR. Auteur en cours.<br>
          J'aide les entrepreneurs à travailler avec l'IA — pas en théorie, sur le terrain.
        </p>
        <div class="hero-cta">
          <a href="https://app.fluenzr.co" target="_blank" class="btn-primary">Découvrir FluenzR</a>
          <a href="#about" class="btn-secondary">Mon histoire</a>
        </div>
      </div>
    </section>

    <!-- Marquee -->
    <div class="marquee-section" aria-hidden="true">
      <div class="marquee-track">
        <span class="marquee-item">FluenzR</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">Gulliver</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">Le Livre</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">openNoClaw</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">IA pour Entrepreneurs</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">FluenzR</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">Gulliver</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">Le Livre</span>
        <span class="marquee-item">·</span>
        <span class="marquee-item">openNoClaw</span>
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
          <span class="project-tag">CRM · Email · IA</span>
          <h3>FluenzR</h3>
          <p>Email marketing B2B augmenté par l'IA. Séquences intelligentes, prospection automatisée, analyse des performances.</p>
          <span class="project-link">Voir le projet</span>
        </a>
        <div class="project-card">
          <span class="project-tag">Agent IA · Automatisation</span>
          <h3>Gulliver</h3>
          <p>Mon robot personnel. Il gère mes crons, publie sur les réseaux, trie mes emails et automatise mes tâches quotidiennes via Claude.</p>
          <span class="project-link">En production</span>
        </div>
        <div class="project-card">
          <span class="project-tag">En cours · 2025</span>
          <h3>Le Livre</h3>
          <p>Comment les entrepreneurs peuvent travailler avec l'IA pour aller plus vite, vendre mieux et construire plus avec moins.</p>
          <span class="project-link">Bientôt</span>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="section">
      <div class="section-header">
        <span class="section-number">02 — Mon histoire</span>
        <h2 class="section-title">Entrepreneur<br>augmenté</h2>
      </div>
      <div class="about-grid">
        <div class="about-text">
          <p>
            J'aurais mis <strong>2 ans à lancer FluenzR.</strong> L'IA m'en a pris 6 mois.
            Pas parce que j'ai utilisé l'IA pour coder — mais parce que j'ai repensé
            toute ma façon de travailler autour d'elle.
          </p>
          <p>
            Aujourd'hui, Gulliver — mon agent IA — gère mes crons, filtre mes emails,
            publie sur LinkedIn, prospecte sur Apollo. Je dors, il bosse.
          </p>
          <p>
            Ce que j'apprends, j'en fais un <strong>livre.</strong> Ce que je construis,
            j'en fais des <strong>produits.</strong> Ce que je vis,
            j'en parle sur <strong>LinkedIn.</strong>
          </p>
        </div>
        <div class="about-stats">
          <div class="stat-item">
            <div class="stat-number">6 mois</div>
            <div class="stat-label">Pour lancer FluenzR avec l'IA vs 2 ans sans</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Gulliver tourne en production</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">1</div>
            <div class="stat-label">Livre en cours sur l'IA pour entrepreneurs</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <div class="contact-section">
      <div class="contact-inner">
        <h2 class="contact-title">On travaille<br>ensemble ?</h2>
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
useSeoMeta({
  title: 'Gilles Helleu — Entrepreneur, IA & Fondateur de FluenzR',
  description: 'Je construis avec l\'IA et j\'aide les entrepreneurs à faire pareil. Fondateur de FluenzR, auteur en cours.',
  ogTitle: 'Gilles Helleu — Je construis avec l\'IA.',
  ogDescription: 'Fondateur de FluenzR. J\'aide les entrepreneurs à travailler avec l\'IA — pas en théorie, sur le terrain.',
})
</script>
