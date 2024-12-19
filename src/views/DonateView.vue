<template>
  <div class="card">
    <div class="DonateField" v-if="!donationResult">
      <div>
        <DonateForm :onDonate="handleDonate" />
      </div>
    </div>
    <div v-else>
      <div class="DonateField">
        <DonateResult :result="donationResult" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DonateForm from '@/components/donate/DonateForm.vue'
import DonateResult from '@/components/donate/DonateCheckout.vue'
import axios from 'axios'

export default defineComponent({
  components: { DonateForm, DonateResult },
  data() {
    return {
      donationResult: null as any,
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
  },
})
</script>

<style scoped>
.DonateField {
  max-width: 700px;
  width: 100%;
  @apply bg-white p-4 drop-shadow rounded;
}
</style>
