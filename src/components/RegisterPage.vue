<template>
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="createUser"> 
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            v-model="username"
            placeholder="Enter username"
          />
        </div>
  
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="email"
            placeholder="Enter email"
          />
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="Enter password"
          />
        </div>
  
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router'
 const router = useRouter();
 const username = ref('');
 const email = ref('');
 const password = ref('');
 

const createUser = async () => {
if (!username.value || !email.value || !password.value) {
    return
}
  try {
    const response = await axios.post('http://localhost:3000/api/createUser', { 
    NAME: username.value,
    EMAIL: email.value,
    PASSWORD: password.value
    });
    console.log("Success:", response.data); 
    console.log(email.value, password.value, username.value);
    router.push('/logIn') 
    } 
  catch (error) {
    console.error("Error:", error); 
  }
};

</script>
  <style scoped>
  .register-container {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  h2 {
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #1ba6d4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #cccccc;
  }
  
  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
  </style>
  