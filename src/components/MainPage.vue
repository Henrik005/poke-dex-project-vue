<template>
  
    <div bg-dark class=" p-3 mb-2 bg-dark text-white">
    
    <h2 class="text-center user-select-none">Welcome to the Pokedex</h2>
    <p class="text-center user-select-none">Search For Any Pokemon!</p>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand user-select-none" href="#">Pokedex</a>
    <button class="navbar-toggler" type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Navigate
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Main Page</a></li>
            <li><a v-on:click="goToProfile" class="dropdown-item" href="#">Profile Page</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a v-on:click="logout" class="dropdown-item" href="#">Sign Out</a></li>
          </ul>
        </li>
      </ul>

      <form @submit.prevent="summonCreatures" class="d-flex" role="search">
        <input @submit.prevent="summonCreatures"
          v-model="searchQuery" 
          class="form-control me-2" 
          type="search"
          placeholder="Search Pokemon"
          aria-label="Search"/>
        <button @click="summonCreatures" class="btn btn-light btn-outline-primary" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
   </div>

<div v-if="pokemon" class="form card bg-dark text-white position-absolute top-50 start-50 translate-middle col-12 col-sm-8 col-md-6 col-lg-4">
      <div class="card-body">
        <h5 class="card-title text-capitalize">{{ pokemon.name }}</h5>
        <p class="card-text">
           <strong>Types:</strong> {{ pokemon.types.join(',') }}<br>
          <strong>Locations:</strong> {{ pokemon.locations.join(', ') }} 
        </p>
        <div class="capture-button">
        <button @click="capturePokemon"
         class="btn btn-light btn-outline-success p-2 ">
         Capture
        </button>
      </div>
      </div>
    </div>

  

 <div v-if="!pokemon" class="card text-dark position-absolute top-50 start-50 translate-middle bg-dark text-white p-2">
 Try Searching for a pokemon! If it exists? It'll apear here!
 </div>
      
    
   
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { ref, onMounted } from 'vue'
  import {jwtDecode} from 'jwt-decode';
  import axios from 'axios';
  const router = useRouter()
  const searchQuery = ref('')
  const pokemon = ref(null)
  const decoded = ref({})
  
  const goToProfile = () => {
  router.push('/profile') 
}
const logout = () => {
  localStorage.removeItem('token');
  router.push('/logIn');
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
    await axios.post('http://localhost:3000/api/capturePokemon', {
      PokemonNAME: pokemon.value.name,
      PokemonTYPE: pokemon.value.types,
      PokemonLOCATIONS: pokemon.value.locations,
      TrainerID: decoded.value.ID
      
    });
    pokemon.value = null; // Clear the captured Pokemon from the view
  } catch (error) {
    alert('Error capturing Pokemon');
    console.error(error);
    
  }
  
}
    
  </script>
  
  <style scoped>
  .cardScale{
  height: 20vh;
  width: 20vw;
}
  </style>
