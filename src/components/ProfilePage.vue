<template>
  <div class="profile-page">
    <button class="logout-btn" @click="logout">Log Out</button>
    <h1>My Profile</h1>

    <div class="profile-info">
      <div class="info-item"><strong>Email:</strong> {{ decoded.EMAIL }}</div>
      <div class="info-item"><strong>Username:</strong> {{ decoded.USERNAME }}</div>
    </div>

    <div class="pokemon-list">
      <div v-for="(capturedPokes, index) in capturedPokemon" :key="index" class="pokemon-card">
        <h3>{{ capturedPokes.PokemonNAME }}</h3>
        <p>Type: {{ capturedPokes.PokemonTYPE }}</p>
        <p>Location: {{ capturedPokes.PokemonLOCATIONS }}</p>
      </div>
    </div>

    <div class="retrieve-btn-container">
      <button @click="retrievePokemon" class="retrieve-btn">Retrieve Pokémon</button>
    </div>
  </div>
</template>

<script setup>
import {jwtDecode} from 'jwt-decode';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';

const router = useRouter();
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

const logout = () => {
  localStorage.removeItem('token');
  router.push('/logIn');
}
</script>

<style scoped>

</style>
