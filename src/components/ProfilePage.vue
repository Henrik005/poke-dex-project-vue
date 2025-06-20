<template>
  <div bg-dark class=" p-3 mb-2 bg-dark text-white">
    
    <h2 class="text-center user-select-none">Your Profile</h2>
    <h5 class="text-center user-select-none">Username: {{decoded.USERNAME}}</h5>
    <h5 class="text-center user-select-none">Email: {{decoded.EMAIL}}</h5>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand user-select-none" href="#">Pokedex</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a v-on:click="goToMain" class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Navigate
          </a>
          <ul class="dropdown-menu">
            <li><a v-on:click="goToMain" class="dropdown-item" href="#">Main Page</a></li>
            <li><a v-on:click="goToProfile" class="dropdown-item" href="#">Profile Page</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a v-on:click="logout" class="dropdown-item" href="#">Sign Out</a></li>
          </ul>
        </li>
      </ul>
      <form @submit.prevent="summonCreatures" class="d-flex" role="search">
      
      </form>
    </div>
  </div>
</nav>

   </div>
  <div class="profile-page">
    <div v-if="!capturedPokemon.length"
     class=" text-dark position-absolute top-50 start-50 translate-middle card bg-dark text-white col-12 col-sm-8 col-md-6 col-lg-4 p-3">
      <h5 class="card-title">Here you will see your Captured Pokemon!</h5>
      <p class="card-text">Search for a Pokemon on the main page and capture it, then click the button bellow!</p>
    <button @click="retrievePokemon" class="btn btn-light btn-outline-success p-2">Show Captured Pokemon</button>
    </div>

    </div>

    <div class="container">
    <div class="row">
    <div v-for="(capturedPokes, index) in capturedPokemon" :key="index"
     class=" col-12 col-sm-6 col-md-4 mb-4 card bg-dark text-white border h-100">
      <div class="card-body">
        <h5 class="card-title text-capitalize">{{ capturedPokes.PokemonNAME }}</h5>
        <p class="card-text  collapse" :id="'pokemonInfo'+ index">
           <strong>Types:</strong> {{ capturedPokes.PokemonTYPE }}<br>
          <strong>Locations:</strong> {{ capturedPokes.PokemonLOCATIONS }} 
        </p>
        <button class="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#pokemonInfo' + index"
          aria-expanded="false"
          :aria-controls="'pokemonInfo' + index">
          Pokemon Info
        </button>
      </div>
    </div>
    <div>
      <button @click="emptyPokemon" v-if="capturedPokemon.length" class="btn btn-light btn-outline-danger p-2">Hide Captured Pokemon</button>
    </div>
    </div>
  </div>
  
 
</template>

<script setup>
import {jwtDecode} from 'jwt-decode';
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const decoded = ref({});
const capturedPokemon = ref([]); 

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

 watch(
  () => route.fullPath,
  () => {
    updateDecoded();
  }
);

 window.addEventListener('storage', (event) => {
   if (event.key === 'token') {
     updateDecoded();
   }
 });

const retrievePokemon = async () => {
  if (!decoded.value.ID) {
    console.warn('No user ID found, cannot retrieve Pokémon.');
    return;
  }
  try {
    const response = await axios.get(`http://localhost:3000/api/getCapturedPokemon/${decoded.value.ID}`);
    capturedPokemon.value = response.data.recordset;
    console.log('Captured Pokémon:', capturedPokemon.value);
  } 
  catch (error) {
    console.error('Error retrieving Pokémon:', error);
  }
}
const emptyPokemon = () => {
  capturedPokemon.value = [];
}
const logout = () => {
  localStorage.removeItem('token');
  router.push('/logIn');
}

const goToMain = () => {
  router.push('/main');
}
</script>

<style scoped>
.cardScale{
  height: 20vh;
  width: 20vw;
}
</style>
