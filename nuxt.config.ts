export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  ssr: true,

  modules: [
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      'Inter': [400, 500, 700, 800],
    },
    display: 'swap',
  },

  app: {
    head: {
      title: 'Gilles Helleu — Entrepreneur, IA & Fondateur de ForgR',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Je construis avec l\'IA et j\'aide les entrepreneurs à faire pareil. Fondateur de ForgR, auteur en cours.' },
        { property: 'og:title', content: 'Gilles Helleu — Je construis avec l\'IA.' },
        { property: 'og:description', content: 'Fondateur de ForgR. J\'aide les entrepreneurs à travailler avec l\'IA — pas en théorie, sur le terrain.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://gilleshelleu.com' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-STRVN3BWB7', async: true },
        {
          innerHTML:
            "window.dataLayer = window.dataLayer || [];" +
            "function gtag(){dataLayer.push(arguments);}" +
            "gtag('js', new Date());" +
            "gtag('config', 'G-STRVN3BWB7');",
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'static',
    prerender: {
      routes: [
        '/methode',
        '/cv',
        '/projets/forgr',
        '/projets/fluenzr',
        '/projets/ciicir',
        '/projets/timalio',
        '/projets/gulliver',
      ],
    },
  },
})
