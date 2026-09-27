<template>
  <div v-if="projet">
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

    <!-- Hero projet -->
    <section class="project-hero">
      <a href="/#projects" class="back-link">← Retour aux projets</a>
      <span class="project-tag">{{ projet.tag }}</span>
      <h1>{{ projet.title }}</h1>
      <p class="project-pitch">{{ projet.pitch }}</p>
      <div class="project-hero-links">
        <a v-if="projet.publicUrl" :href="projet.publicUrl.href" target="_blank" rel="noopener" class="btn-primary">{{ projet.publicUrl.label }} →</a>
        <a v-if="projet.repoUrl" :href="projet.repoUrl.href" target="_blank" rel="noopener" class="btn-secondary">{{ projet.repoUrl.label }} →</a>
      </div>
    </section>

    <!-- Stack -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">Stack technique</span>
        <h2 class="tech-block-title">Ce que j'ai utilisé</h2>
      </div>
      <div class="stack-category" v-for="cat in projet.stack" :key="cat.label">
        <span class="stack-category-label">{{ cat.label }}</span>
        <div class="pill-group">
          <span class="pill" v-for="item in cat.items" :key="item">{{ item }}</span>
        </div>
      </div>
    </section>

    <!-- Architecture -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">Architecture</span>
        <h2 class="tech-block-title">Comment c'est construit</h2>
      </div>
      <p v-for="(p, i) in projet.architecture" :key="i">{{ p }}</p>
    </section>

    <!-- IA -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">Intégrations IA</span>
        <h2 class="tech-block-title">Ce que l'IA fait dans le produit</h2>
      </div>
      <ul class="list-clean">
        <li v-for="(p, i) in projet.ia" :key="i">{{ p }}</li>
      </ul>
    </section>

    <!-- Qualité -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">Qualité</span>
        <h2 class="tech-block-title">Tests et vérifications</h2>
      </div>
      <ul class="list-clean">
        <li v-for="(p, i) in projet.qualite" :key="i">{{ p }}</li>
      </ul>
    </section>

    <!-- Déploiement -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">Déploiement & exploitation</span>
        <h2 class="tech-block-title">Ce qui part en production</h2>
      </div>
      <p v-for="(p, i) in projet.deploiement" :key="i">{{ p }}</p>
    </section>

    <!-- Sécurité -->
    <section class="tech-block">
      <div class="tech-block-header">
        <span class="tech-block-label">Sécurité</span>
        <h2 class="tech-block-title">Ce qui protège le produit</h2>
      </div>
      <ul class="list-clean">
        <li v-for="(p, i) in projet.securite" :key="i">{{ p }}</li>
      </ul>
    </section>

    <!-- Ce qui a cassé -->
    <section class="tech-block">
      <div class="callout">
        <span class="callout-label">{{ projet.appris.label }}</span>
        <p>{{ projet.appris.text }}</p>
      </div>
    </section>

    <!-- Autres projets -->
    <section class="project-nav-footer">
      <a href="/" class="btn-secondary">← Retour à l'accueil</a>
      <div class="pill-group">
        <NuxtLink
          v-for="autre in autresProjets"
          :key="autre.slug"
          :to="`/projets/${autre.slug}`"
          class="pill"
        >{{ autre.title }}</NuxtLink>
      </div>
    </section>

    <footer>
      <p>© 2026 Gilles Helleu</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { projets, getProjet } from '~/data/projets'

const route = useRoute()
const slug = route.params.slug as string
const projet = getProjet(slug)

if (!projet) {
  throw createError({ statusCode: 404, statusMessage: 'Projet introuvable' })
}

const autresProjets = computed(() => projets.filter((p) => p.slug !== projet!.slug))
const menuOpen = ref(false)

useSeoMeta({
  title: `${projet.title} — Détails techniques | Gilles Helleu`,
  description: `${projet.pitch} Stack, architecture, IA, tests, déploiement et sécurité.`,
  ogTitle: `${projet.title} — Gilles Helleu`,
  ogDescription: projet.pitch,
})
</script>
