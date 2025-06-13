<template>
  
    <div class="home-container">
      <form @submit.prevent="summonCreatures">
      <div class="search-bar">
        <input type="text" placeholder="Search..." v-model="searchQuery" />
      </div>
      </form>
  
      <div class="profile-button">
        <button @click="goToProfile">Profile</button>
      </div>
  
   
      <div class="scrollable-text">
        <p v-for="(line, index) in linesOfText" :key="index">{{ line  }}</p>
        <div class="capture-button">
        <button @click="capturePokemon">Capture</button>
      </div>
      </div>

      <div class="capture-button">
        <button @click="capturePokemon">Capture</button>
      </div>
    </div>
   
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { ref, onMounted } from 'vue'
  import {jwtDecode} from 'jwt-decode';
  import axios from 'axios';
  const router = useRouter()
  const linesOfText = ref([])
  const searchQuery = ref('')
  const pokemon = ref(null)
  const decoded = ref({})
  
  const goToProfile = () => {
  router.push('/profile') 
}
 function updateDecoded() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        decoded.value = jwtDecode(token);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    } else {
      decoded.value = {};
    }
  }

   onMounted(() => {
    updateDecoded();
  });

 window.addEventListener('storage', (event) => {
    if (event.key === 'token') {
      updateDecoded();
    }
  });

const summonCreatures = async () => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery.value.toLowerCase()}`)

    const name = response.data.name
    const types = response.data.types.map(t => t.type.name)
    const locationResponse = await axios.get(response.data.location_area_encounters)
    const locations = locationResponse.data.map(loc => loc.location_area.name)

    pokemon.value = {
      name,
      types,
      locations
    }

    linesOfText.value = []
    linesOfText.value.push(`Name: ${pokemon.value.name}`)
    linesOfText.value.push(`Types: ${pokemon.value.types.join(', ')}`)
    linesOfText.value.push(`Locations: ${pokemon.value.locations.join(', ')}`)
  } 
  catch (error) {
    alert('Incorrect Name Or Pokemon Does Not Exist');
    console.error('Error fetching data:', error)
    pokemon.value = null
  }
}

 const capturePokemon = async () => {
  if (!pokemon.value) {
    alert('No Pokemon to capture!');
    return;
  }
  if (!decoded.value.ID) {
    alert('You must be logged in to capture a Pokemon!');
    return;
  }
  try {
    console.log('Decoded:', decoded.value);
    console.log('TrainerID:', decoded.value.ID);
    await axios.post('http://localhost:3000/api/capturePokemon', {
      PokemonNAME: pokemon.value.name,
      PokemonTYPE: pokemon.value.types,
      PokemonLOCATIONS: pokemon.value.locations,
      TrainerID: decoded.value.ID
      
    });
    alert(`Pokemon Captured!!!`);
    linesOfText.value = [];
    pokemon.value = null;
  } catch (error) {
    alert('Error capturing Pokemon');
    console.error(error);
  }
}
    
  </script>
  
  <style scoped>
  
  </style>
