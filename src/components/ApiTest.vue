<template>
    <div class ="Test">
      
      <button @click="register">register</button>
    </div>
</template>

//This component is litteraly just for spur of the moment experimentation
//Please don't mind the mess.
 
<script setup>
import axios from 'axios';
function register(){
axios.post('http://localhost:3000/api/createUser',
  {
    NAME: "bon",
    EMAIL: "bon@email.com",
    PASSWORD: "b0nb0n"
  }
)
.then(response => console.log(response.data))
}
</script>
