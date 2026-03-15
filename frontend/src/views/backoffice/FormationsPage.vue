<template>
  <div class="formations-page">
    <h1>Gestion des Formations</h1>

    <!-- Formulaire pour ajouter ou modifier une formation -->
    <div class="formation-item">
      <input v-model="newFormation.title" placeholder="Titre" />
      <textarea v-model="newFormation.description" placeholder="Description"></textarea>
      <input v-model="newFormation.year" placeholder="Année" />
      <button @click="addOrUpdateFormation">Ajouter ou Mettre à jour</button>
    </div>

    <!-- Liste des formations existantes -->
    <ul v-if="formations.length">
      <li v-for="formation in formations" :key="formation.id">
        <h3>{{ formation.title }}</h3>
        <p>{{ formation.description }}</p>
        <p>Année : {{ formation.year }}</p>
        <button @click="selectFormation(formation)">Modifier</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Formation {
  id: number;
  title: string;
  description: string;
  year: number;
}

const formations = ref<Formation[]>([]);

// Pour stocker les données du formulaire
const newFormation = ref<Formation>({
  id: 0,
  title: '',
  description: '',
  year: new Date().getFullYear(),
});

// Fonction pour récupérer les formations existantes
async function fetchFormations() {
  try {
    const response = await fetch('http://localhost:8080/formations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      formations.value = data;
    } else {
      console.error('Erreur lors de la récupération des formations.');
    }
  } catch (error) {
    console.error('Erreur :', error);
  }
}

// Fonction pour ajouter ou mettre à jour une formation
async function addOrUpdateFormation() {
  const method = newFormation.value.id && newFormation.value.id !== 0 ? 'PUT' : 'POST';
  const url = newFormation.value.id && newFormation.value.id !== 0
    ? `http://localhost:8080/formations/${newFormation.value.id}`
    : 'http://localhost:8080/formations';

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFormation.value),
    });
    if (response.ok) {
      alert(
        newFormation.value.id
          ? 'Formation mise à jour avec succès !'
          : 'Formation ajoutée avec succès !'
      );
      fetchFormations(); // Rafraîchit la liste après ajout ou mise à jour
      newFormation.value = { id: 0, title: '', description: '', year: new Date().getFullYear() }; // Réinitialise le formulaire
    } else {
      console.error('Erreur lors de l\'opération.');
    }
  } catch (error) {
    console.error('Erreur :', error);
  }
}

// Fonction pour remplir le formulaire avec une formation existante
function selectFormation(formation: Formation) {
  newFormation.value = { ...formation }; // Copie la formation sélectionnée dans le formulaire
}

onMounted(() => {
  fetchFormations();
});
</script>
