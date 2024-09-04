<template>
  <div class="convert">
    <h1>Конвертация валют</h1>
    <form class="conversion-form">
      <div class="conversion-row">
        <select class="currency-select" v-model="currencyFrom" @change="convertCurrency('from')">
          <option v-for="currency in supportedCurrencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
        <input
          class="currency-input"
          type="number"
          v-model.number="amountFrom"
          @input="convertCurrency('from')"
        />
      </div>

      <div class="conversion-row">
        <select class="currency-select" v-model="currencyTo" @change="convertCurrency('to')">
          <option v-for="currency in supportedCurrencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
        <input
          class="currency-input"
          type="number"
          v-model.number="amountTo"
          @input="convertCurrency('to')"
          readonly
        />
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useCurrencyStore } from '../stores/currency'

const store = useCurrencyStore()
const supportedCurrencies = computed(() =>
  store.supportedCurrencies.map((currency) => currency.toUpperCase())
)
const currencyFrom = ref(supportedCurrencies.value[0])
const currencyTo = ref(supportedCurrencies.value[1])
const amountFrom = ref(0)
const amountTo = ref(0)

const getRate = (base, target) => {
  return store.rates[base]?.[target] || 'N/A'
}
const convertCurrency = (source) => {
  if (source === 'from') {
    const rate = getRate(currencyFrom.value.toLowerCase(), currencyTo.value.toLowerCase())
    if (rate !== 'N/A') {
      amountTo.value = (amountFrom.value * rate).toFixed(2)
    } else {
      amountTo.value = 'N/A'
    }
  }
}

onMounted(() => {
  store.fetchRates().then(() => {
    convertCurrency('from')
  })
})
// Watch for changes in currencyFrom, currencyTo, and amountFrom
watch([currencyFrom, currencyTo, amountFrom], () => {
  convertCurrency('from')
})

// Watch for changes in amountTo
watch(amountTo, () => {
  convertCurrency('to')
})
</script>

<style>
.convert {
  padding: 20px;
}
.conversion-form {
  display: flex;
  flex-direction: column;
}
.conversion-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.currency-select {
  padding: 5px;
  font-size: 16px;
  margin-right: 10px;
}
.currency-input {
  padding: 5px;
  font-size: 16px;
  width: 150px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
