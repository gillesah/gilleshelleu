<template>
  <div class="formations-page">
    <h1>Gestion des Formations</h1>
    <div v-for="formation in formations" :key="formation.id" class="formation-item">
      <input v-model="formation.title" placeholder="Titre" />
      <textarea v-model="formation.description" placeholder="Description"></textarea>
      <input v-model="formation.year" placeholder="Année" />
      <button @click="updateFormation(formation)">Mettre à jour</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Définition de l'interface
interface Formation {
  id: number
  title: string
  description: string
  year: number
}

// Déclaration des données avec le type `Formation[]`
const formations = ref<Formation[]>([
  { id: 1, title: 'Formation 1', description: 'Description de la formation 1', year: 2020 },
  { id: 2, title: 'Formation 2', description: 'Description de la formation 2', year: 2021 }
])

// Typage du paramètre `formation`
function updateFormation(formation: Formation) {
  fetch(`http://localhost:8080/formations/${formation.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formation)
  })
    .then(response => {
      if (response.ok) {
        alert('Formation mise à jour avec succès !')
      } else {
        alert('Erreur lors de la mise à jour de la formation.')
      }
    })
    .catch(error => console.error('Erreur:', error))
}
</script>
