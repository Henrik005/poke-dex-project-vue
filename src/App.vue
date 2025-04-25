<template>
  <div></div>
 <router-view></router-view>
  
</template>

<script setup>
 import { useRouter } from 'vue-router';

 const router = useRouter()
  startUp()
  function startUp(){
  router.push('/main')
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
