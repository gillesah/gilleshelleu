<template>
  <div class="login-page">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin">
      <label for="username">Nom d'utilisateur</label>
      <input type="text" id="username" v-model="username" required />

      <label for="password">Mot de passe</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Se connecter</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Données réactives
const username = ref('')
const password = ref('')
const error = ref('')

// Méthode de connexion
async function handleLogin() {
  try {
    // Effectue une requête POST vers l'endpoint /login du serveur
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username.value, password: password.value })
    })

    if (response.ok) {
      const data = await response.json()
      // Enregistre le token (par exemple dans le localStorage, à ajuster selon tes besoins)
      localStorage.setItem('token', data.token)
      // Redirige vers la page des formations
      router.push('/formations')
    } else {
      // Gère le cas où les identifiants sont incorrects
      error.value = "Nom d'utilisateur ou mot de passe incorrect"
    }
  } catch (err) {
    console.error('Erreur lors de la tentative de connexion :', err)
    error.value = 'Erreur lors de la tentative de connexion'
  }
}
</script>
