<template>
  <div class="flex justify-center pt-10 phone:m-5 phone:pt-3">
    <div class="card" v-if="!donationResult">
      <div>
        <DonateForm :onDonate="handleDonate" />
      </div>
    </div>
    <div v-else-if="!paymentConfirmed">
      <div class="card">
        <DonateResult :result="donationResult" @paymentConfirmed="handlePaymentConfirmed" />
      </div>
    </div>
    <div v-else>
      <div class="card">
        <h2 class="text-center text-green-500">Obrigado! Pagamento Confirmado!</h2>
        <!-- Adicione mais detalhes aqui -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DonateForm from '@/components/donate/DonateFormComponent.vue'
import DonateResult from '@/components/donate/DonateCheckoutComponent.vue'
import axios from 'axios'

export default defineComponent({
  components: { DonateForm, DonateResult },
  data() {
    return {
      donationResult: null as any,
      paymentConfirmed: false,
    }
  },
  methods: {
    async handleDonate(formData: any) {
      try {
        const response = await axios.post('http://localhost:3000/backend/v1/donates', {
          donate: formData,
        })
        this.donationResult = response.data
      } catch (error) {
        console.error('Donation failed:', error)
      }
    },
    handlePaymentConfirmed() {
      this.paymentConfirmed = true
    },
  },
})
</script>
