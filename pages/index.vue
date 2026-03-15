<template>
  <main>
    <section class="hero">
      <p class="label">Entrepreneur · IA · Fondateur</p>
      <h1>Gilles Helleu</h1>
      <p class="tagline">Je construis avec l'IA.<br>Je n'en parle pas — je l'utilise.</p>
      <div class="cta-group">
        <a href="https://app.fluenzr.co" target="_blank" class="btn-primary">Découvrir FluenzR</a>
        <a href="#about" class="btn-secondary">En savoir plus</a>
      </div>
    </section>

    <section id="projects" class="section">
      <h2>Ce que je construis</h2>
      <div class="projects-grid">
        <a href="https://fluenzr.co" target="_blank" class="project-card">
          <span class="project-tag">CRM Email</span>
          <h3>FluenzR</h3>
          <p>Email marketing B2B augmenté par l'IA. Prospection, séquences, analyse.</p>
        </a>
        <div class="project-card">
          <span class="project-tag">Agent IA</span>
          <h3>Gulliver</h3>
          <p>Mon robot personnel — gère mes crons, publie sur les réseaux, automatise mes tâches quotidiennes.</p>
        </div>
        <div class="project-card">
          <span class="project-tag">En cours</span>
          <h3>Le livre</h3>
          <p>Comment les entrepreneurs peuvent travailler avec l'IA — pas en théorie, sur le terrain.</p>
        </div>
      </div>
    </section>

    <section id="about" class="section section-alt">
      <div class="about-content">
        <h2>Entrepreneur augmenté par l'IA</h2>
        <p>
          J'aurais mis 2 ans à lancer FluenzR. L'IA m'en a pris 6 mois.
          Depuis, je construis tous mes projets avec l'IA comme co-pilote — et j'aide d'autres entrepreneurs à faire pareil.
        </p>
        <p>
          Pas de théorie. Des workflows réels, des outils concrets, des résultats mesurables.
        </p>
      </div>
    </section>

    <section id="contact" class="section">
      <h2>On travaille ensemble ?</h2>
      <p>Tu veux intégrer l'IA dans ton business ? Parlons-en.</p>
      <a href="mailto:gilles@fluenzr.co" class="btn-primary">Me contacter</a>
    </section>

    <footer>
      <p>© 2026 Gilles Helleu · <a href="https://fluenzr.co">FluenzR</a></p>
    </footer>
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Gilles Helleu — Entrepreneur, IA & Fondateur de FluenzR',
  description: 'Je construis avec l\'IA et j\'aide les entrepreneurs à faire pareil. Fondateur de FluenzR.',
  ogTitle: 'Gilles Helleu',
  ogDescription: 'Je construis avec l\'IA. Je n\'en parle pas — je l\'utilise.',
})
</script>
