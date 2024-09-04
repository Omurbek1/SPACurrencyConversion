import { defineStore } from 'pinia'
import axios from 'axios'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    baseCurrency: 'usd',
    rates: {},
    supportedCurrencies: ['usd', 'eur', 'rub']
  }),
  actions: {
    async fetchRates() {
      try {
        const response = await axios.get('https://status.neuralgeneration.com/api/currency')
        const rawRates = response.data

        const parsedRates = {}
        for (const [key, value] of Object.entries(rawRates)) {
          const [base, target] = key.split('-')
          if (!parsedRates[base]) {
            parsedRates[base] = {}
          }
          parsedRates[base][target] = value
        }

        this.rates = parsedRates
      } catch (error) {
        console.error('Error fetching currency rates:', error)
      }
    },
    setBaseCurrency(currency) {
      this.baseCurrency = currency
    }
  },
  getters: {
    getRate: (state) => (base, target) => {
      return state.rates[base] ? state.rates[base][target] : null
    }
  }
})
