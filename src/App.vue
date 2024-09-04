<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <header>
    <div>
      <Header />
    </div>
  </header>
  <RouterView />
  <Footer />
</template>

<style scoped></style>
