<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    
    <button @click="goToRegister" class="register-btn">Register?</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()


const goToRegister = () => {
  router.push('/register') 
}


const login = () => {
  //Insert amazing and groundbreaking login logic here.
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

div {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 10px;
  background-color: #1ba6d4;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #1ba6d4;
}


.register-btn {
  margin-top: 10px;
  padding: 10px;
  background-color: #ff8c00;
  color: white;
  border: none;
  cursor: pointer;
}

.register-btn:hover {
  background-color: #e07b00;
}
</style>
