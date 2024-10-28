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
function handleLogin() {
  if (username.value === 'admin' && password.value === 'password') {
    router.push('/formations')
  } else {
    error.value = "Nom d'utilisateur ou mot de passe incorrect"
  }
}
</script>
