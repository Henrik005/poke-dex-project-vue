<template>
    <div class="container d-flex justify-content-center align-items-center vh-150">
      <div class="border pt-5 p-5 mb-2 bg-dark text-white register-container rounded-4">
      <h2 class="user-select-none">Please Enter Your Details Bellow</h2>
      <form @submit.prevent="createUser"> 
        <div>
        <input type="text" class="form-control m-2" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" v-model="email" required />
      </div>
  
        <div>
        <input type="text" class="form-control m-2" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" v-model="username" required />
      </div>
  
        <div>
        <input type="Password" class="form-control m-2" placeholder="Password" aria-label="Password" aria-describedby="Password" v-model="password" required />
      </div>

        <div>
        <input type="Password" class="form-control m-2" placeholder="Confirm Password" aria-label="Confirm Password" aria-describedby="basic-addon1" v-model="confirmPassword" required />
      </div>
  
        <button type="submit" class ="btn btn-light btn-outline-success m-2">Register</button>
      </form>
      </div>
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
 const confirmPassword = ref('');

const createUser = async () => {
if (!username.value || !email.value || !password.value) {
    return
}
if (password.value !== confirmPassword.value) {
    console.error("Passwords do not match");
    alert("Passwords do not match");
    return;}

  try {
    const response = await axios.post('http://localhost:3000/api/createUser', { 
    NAME: username.value,
    EMAIL: email.value,
    PASSWORD: password.value
    });
    console.log("Success:", response.data); 
    console.log(email.value, password.value, username.value);

   console.log('token:',response.data.token)
   const data = response.data;
   localStorage.setItem('token', data.token)
   console.log(response)
   router.push('/main')
    } 
  catch (error) {
    console.error("Error:", error); 
  }
  
  
};

</script>
  <style scoped>
  
  </style>
  