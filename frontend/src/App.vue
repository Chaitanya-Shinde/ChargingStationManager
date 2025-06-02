<script setup>
 import { RouterView } from 'vue-router'
// import HomePageView from './views/HomePageView.vue'

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
</style>

<template>
  <header>
    <div class="wrapper">
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/auth">Auth</RouterLink>
      </nav> -->
    </div>
  </header>

  <RouterView />
</template>

