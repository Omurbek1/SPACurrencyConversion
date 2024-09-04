<template>
  <div class="home">
    <h1>Курсы валют</h1>
    <ul class="currency-list">
      <li class="currency-item" v-for="currency in filteredCurrencies" :key="currency">
        {{ baseCurrency.toUpperCase() }} = {{ getRate(baseCurrency, currency) }}
        {{ currency.toUpperCase() }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCurrencyStore } from '../stores/currency'
import { computed, onMounted } from 'vue'

const store = useCurrencyStore()
const supportedCurrencies = store.supportedCurrencies
const baseCurrency = computed(() => store.baseCurrency)

const getRate = (base, target) => {
  return store.rates[base]?.[target] || 'N/A'
}
const filteredCurrencies = computed(() => {
  return supportedCurrencies.filter((currency) => currency !== baseCurrency.value)
})

onMounted(() => {
  store.fetchRates()
})
</script>

<style scoped>
.home {
  padding: 20px;
}
.currency-list {
  list-style-type: none;
  padding: 0;
}
.currency-item {
  font-size: 18px;
  margin: 5px 0;
}
</style>
