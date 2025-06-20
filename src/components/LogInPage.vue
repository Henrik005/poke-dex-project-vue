<template>
  <div class = "container d-flex justify-content-center align-items-center vh-150">
  <div class="pt-5 p-5 mb-2 bg-dark text-white login rounded-4">
    <h2 class ="user-select-none">Enter Your Username & Password</h2>
    <form @submit.prevent="login">
      <!-- style = "width: 600px; height: 400px;" -->
      <div>
        <input type="text" class="form-control m-2" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" v-model="username" required />
      </div>
      <div>
       <input type="password" class="form-control m-2" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" v-model="password" required />
      </div>
      
      <button @click="login" type="button" class ="btn btn-light btn-outline-primary m-3">Login</button>
      
    </form>
    <p></p>
    <h5 class="text-center user-select-none ">Don't have an account? Register <a @click="goToRegister" class ="icon-link pe-auto">Here!</a></h5>
    
  </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {ref} from "vue"
import axios from "axios"
const router = useRouter()
const username = ref('')
const password = ref('')

const goToRegister = () => {
  router.push('/register') 
}


const login = async () => {
  try {
  const response = await axios.post('http://localhost:3000/api/login', {
    USERNAME: username.value, 
    PASSWORD: password.value
  })
   console.log('token:',response.data.token)
   const data = response.data;
   localStorage.setItem('token', data.token)
   console.log(response)
   router.push('/main')
  }
  catch (error) {
    console.error("Error:", error); 
  }
}
</script>

<style scoped>

</style>
