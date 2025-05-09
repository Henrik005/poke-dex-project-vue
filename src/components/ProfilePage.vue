<template>
    <div class="profile-page">
      <h1>My Profile</h1>
  
      <div class="profile-info">
        <div class="info-item"><strong>Email:</strong> {{ decoded.EMAIL }}</div>
        <div class="info-item"><strong>Username:</strong> {{ decoded.USERNAME }}</div>
      </div>
    </div>
    <div class="scrollable-text">
        <p v-for="(line, index) in capturedPokemon" :key="index">{{ line }}</p>
      </div>
  </template>
  
  <script setup>
  import {jwtDecode} from 'jwt-decode';
  import { ref, onMounted } from 'vue'

  const decoded = ref({});
  
  onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      decoded.value = jwtDecode(token);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }
});
    

  </script>
  
  <style scoped>
  .profile-page {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1.5rem;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .profile-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .info-item {
    font-size: 1.1rem;
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
  </style>
  