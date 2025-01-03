<template>
  <div class="card text-center">
    <div>
      <h1>Os maiorais do Mês</h1>
      <ul>
        <li v-for="(value, nickname) in donates" :key="nickname">
          <strong>{{ nickname }}</strong
          >: {{ formatCurrency(value) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ApiBackend from '@/services/BackendService'

export default defineComponent({
  data() {
    return {
      donates: {} as Record<string, number>,
    }
  },
  mounted() {
    ApiBackend.V1('get', '/donates', undefined, false)
      .then((res) => {
        this.donates = res.data
      })
      .catch((e) => {
        console.error('Erro ao carregar doações:', e)
      })
  },
  methods: {
    formatCurrency(value: number): string {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value)
    },
  },
})
</script>

<style></style>
