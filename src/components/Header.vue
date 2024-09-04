<template>
  <header class="header">
    <nav class="nav">
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/convert">Конвертация</RouterLink>
    </nav>
    <select class="currency-select" v-model="selectedCurrency" @change="updateBaseCurrency">
      <option v-for="currency in supportedCurrencies" :key="currency" :value="currency">
        {{ currency.toUpperCase() }}
      </option>
    </select>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useCurrencyStore } from '../stores/currency'
import { computed } from 'vue'
const store = useCurrencyStore()
const supportedCurrencies = store.supportedCurrencies
const selectedCurrency = computed(() => store.baseCurrency)

const updateBaseCurrency = (event) => {
  store.setBaseCurrency(event.target.value)
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #282c34;
  color: white;
}
.nav {
  display: flex;
}
.nav-link {
  margin-right: 20px;
  color: white;
  text-decoration: none;
}
.nav-link:hover {
  text-decoration: underline;
}
.currency-select {
  padding: 5px;
  font-size: 16px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
