<template>
    <div class="home-container">
      <div class="search-bar">
        <input type="text" placeholder="Search..." v-model="searchQuery" />
      </div>
  
      <div class="login-button">
        <button @click="goToLogIn">Log In</button>
      </div>
  
      <div class="scrollable-text">
        <p v-for="(line, index) in textLines" :key="index">{{ line }}</p>
      </div>
    </div>
   
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const goToLogIn = () => {
  router.push('/logIn') 
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
  
  
  .login-button {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  
  .login-button button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #1ba6d4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .login-button button:hover {
    background-color: #1ba6d4;
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
  