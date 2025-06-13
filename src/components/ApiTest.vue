
<template>
  <div bg-dark class="p-3 mb-2 bg-dark text-white" style="height: 100vh; width: 100vw;">
    
    <h2 class="text-center user-select-none">Welcome to the Pokedex</h2>
    <p class="text-center user-select-none">Explore the world of Pokemon!</p>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand user-select-none" href="#">Pokedex</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Navigate
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Profile Page</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Sign Out</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search Pokemon" aria-label="Search"/>
        <button class="btn btn-light btn-outline-primary" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
   </div>
  
</template>

<script setup>

</script>
