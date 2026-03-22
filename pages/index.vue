<template>
  <div>

    <!-- Nav -->
    <nav :class="{ 'menu-open': menuOpen }">
      <a href="/" class="nav-logo">GILLES HELLEU</a>
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
    <div class="marquee-section" aria-hidden="true"></div>

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
        <a href="https://github.com/gillesah/openNoClaw" target="_blank" class="project-card">
          <span class="project-tag">Agent IA · Open Source</span>
          <h3>Gulliver</h3>
          <p>Mon robot IA personnel en production 24h/24. Il publie sur LinkedIn, trie mes emails, prospecte sur Apollo et gère mes crons. Construit sur openNoClaw, mon projet open source.</p>
          <span class="project-link">github.com/gillesah/openNoClaw</span>
        </a>
        <div class="project-card">
          <span class="project-tag">Livre · Éditions Envol</span>
          <h3>Mon meilleur employé est une IA</h3>
          <div class="book-card-content">
            <img :src="bookCoverSrc" alt="Couverture du livre" class="book-cover-img" />
            <p>Décuplez le potentiel de votre entreprise avec les agents IA autonomes.</p>
          </div>
          <span class="project-link">Bientôt disponible</span>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="section">
      <div class="section-header">
        <span class="section-number">02 — Qui je suis</span>
        <h2 class="section-title">Ingénieur,<br>fondateur,<br>terrain.</h2>
      </div>
      <div class="about-grid">
        <div class="about-text">
          <p>
            Je suis <strong>ingénieur logiciel</strong> et <strong>fondateur</strong>.
            Je code, je construis des SaaS, je déploie des agents IA en production.
            Pas en théorie — tous les jours, dans mes propres projets.
          </p>
          <p>
            Avant ça, <strong>20 ans dans le business</strong> : fondateur d'une agence à Paris,
            management d'équipes, communication digitale.
            Je connais les vrais problèmes des entrepreneurs parce que je les ai vécus.
          </p>
          <p>
            Aujourd'hui je dirige <strong>Le Meon</strong>, ma structure sous laquelle je construis
            FluenzR, BskyGrowth et mes projets IA. J'aurais mis 2 ans à lancer FluenzR.
            <strong>L'IA m'en a pris 6 mois.</strong>
          </p>
          <p>
            J'aide les entrepreneurs et chefs d'entreprise à faire pareil.
          </p>
        </div>
        <div class="about-facts">
          <div class="fact-item">
            <span class="fact-number">3</span>
            <span class="fact-label">SaaS lancés avec l'IA</span>
          </div>
          <div class="fact-item">
            <span class="fact-number">20+</span>
            <span class="fact-label">Années d'expérience business</span>
          </div>
          <div class="fact-item">
            <span class="fact-number">6</span>
            <span class="fact-label">Mois pour construire FluenzR</span>
          </div>
          <div class="fact-item">
            <span class="fact-number">24/7</span>
            <span class="fact-label">Gulliver, mon agent IA en production</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <div id="contact" class="contact-section">
      <div class="contact-inner">
        <h2 class="contact-title">Vous voulez intégrer<br>l'IA dans<br>votre business ?</h2>
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <input type="text" v-model="form.name" placeholder="Votre nom" required />
          </div>
          <div class="form-group">
            <input type="email" v-model="form.email" placeholder="Votre email" required />
          </div>
          <div class="form-group">
            <textarea v-model="form.message" placeholder="Votre message" rows="4" required></textarea>
          </div>
          <p v-if="formStatus === 'success'" class="form-success">Message envoyé — je vous réponds sous 48h.</p>
          <p v-if="formStatus === 'error'" class="form-error">Une erreur s'est produite. Écrivez-moi à gilles@fluenzr.co</p>
          <button type="submit" class="btn-primary" :disabled="formStatus === 'sending'">
            {{ formStatus === 'sending' ? 'Envoi...' : 'Envoyer' }}
          </button>
        </form>
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
const bookCoverSrc = '/images/livre-cover.jpg'

const form = ref({ name: '', email: '', message: '' })
const formStatus = ref<'' | 'sending' | 'success' | 'error'>('')

async function submitForm() {
  formStatus.value = 'sending'
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(form.value),
    })
    if (res.ok) {
      formStatus.value = 'success'
      form.value = { name: '', email: '', message: '' }
    } else {
      formStatus.value = 'error'
    }
  } catch {
    formStatus.value = 'error'
  }
}

useSeoMeta({
  title: 'Gilles Helleu — Entrepreneur, IA & Fondateur de FluenzR',
  description: 'L\'IA libère votre temps. Je vous montre comment. Fondateur de FluenzR et BskyGrowth, auteur en cours.',
  ogTitle: 'Gilles Helleu — L\'IA libère votre temps.',
  ogDescription: 'Des outils concrets, des workflows réels. Ce que j\'applique moi-même dans mes projets.',
})
</script>
