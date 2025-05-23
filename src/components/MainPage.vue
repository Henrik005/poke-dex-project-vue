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
        <p v-for="(line, index) in linesOfText" :key="index">{{ line }}</p>
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
    const types = response.data.types.map(indexType => indexType.type.name)
    const locationResponse = await axios.get(response.data.location_area_encounters)
    const locations = locationResponse.data.map(indexLocation => indexLocation.location_area.name)

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
    console.error('Error fetching data:', error)
    pokemon.value = null
  }
}

const capturePokemon = async () => {
  
  if(!pokemon.value) {
    alert('No Pokemon to capture!')
    return
  }
  try{
   await axios.post('http://localhost:3000/api/capturePokemon',{
  NAME: pokemon.value.name,
  TYPES: pokemon.value.types,
  LOCATIONS: pokemon.value.locations,
  ID: decoded.value.ID
})} catch(error){
    alert('Error capturing Pokemon')
  }
  alert(`Captured ${pokemon.value.name}`)
  linesOfText.value = []
  pokemon.value = null


}


    
  </script>
  
  <style scoped>
  .home-container {
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
  }
  
  
  .search-bar {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .search-bar input {
    padding: 10px;
    font-size: 16px;
    width: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center; 
  }
  
  
  .profile-button {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  
  .profile-button button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #1ba6d4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .profile-button button:hover {
    background-color: #077093;
  }
  
  
  .scrollable-text {
    max-height: 60vh;
    width: 80%;
    overflow-y: scroll;
    margin-top: 80px;
    padding: 20px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .scrollable-text p {
    margin: 10px 0;
    font-size: 16px;
  }

  .capture-button {
    margin-top: 20px;
    width: 80%;
    display: flex;
    justify-content: center;
  }

  .capture-button button {
    padding: 12px 32px;
    font-size: 18px;
    background-color: #63ca08;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .capture-button button:hover {
    background-color: #469c04;
  }
  </style>
