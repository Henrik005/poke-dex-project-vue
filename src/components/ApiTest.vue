<template>
    <div class ="Test">
      
      <button @click="getData()">GetData</button>
    </div>
</template>



<script setup>
import axios from 'axios';
function getData(){
axios.get('http://localhost:3000/api/getAllUsers')
.then(response => console.log(response.data))
}
</script>
