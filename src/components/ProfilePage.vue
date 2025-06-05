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
.profile-page {
  width: 90vw;
  min-height: 90vh;
  margin: 2vh auto;
  padding: 2.5rem 0;
  border-radius: 16px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.logout-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  z-index: 10;
}
.logout-btn:hover {
  background-color: #c0392b;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}
.info-item {
  font-size: 1.1rem;
}


.scrollable-text {
  position: relative;
  margin: 2rem auto 0 auto;
  max-height: 30vh;
  width: 80%;
  overflow-y: scroll;
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scrollable-text p {
  margin: 10px 0;
  font-size: 16px;
}

.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.pokemon-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  padding: 1rem 2rem;
  min-width: 180px;
  text-align: center;
}

.retrieve-btn-container {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.retrieve-btn {
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  background-color: #1ba6d4;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.retrieve-btn:hover {
  background-color: #168bb3;
}
</style>
