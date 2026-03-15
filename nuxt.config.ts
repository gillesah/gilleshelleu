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
      title: 'Gilles Helleu — Entrepreneur, IA & Fondateur de FluenzR',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Je construis avec l\'IA et j\'aide les entrepreneurs à faire pareil. Fondateur de FluenzR, auteur en cours.' },
        { property: 'og:title', content: 'Gilles Helleu — Je construis avec l\'IA.' },
        { property: 'og:description', content: 'Fondateur de FluenzR. J\'aide les entrepreneurs à travailler avec l\'IA — pas en théorie, sur le terrain.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://gilleshelleu.com' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'static',
  },
})
