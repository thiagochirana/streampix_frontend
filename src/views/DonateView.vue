<template>
  <div class="flex justify-center pt-10 phone:m-5 phone:pt-3">
    <DonateUnavailable v-if="!backendUp" />
    <div class="card" v-else-if="!donationResult">
      <div>
        <DonateForm :onDonate="handleDonate" />
      </div>
    </div>
    <div v-else-if="!paymentConfirmed">
      <div class="card">
        <DonateResult :result="donationResult" @paymentConfirmed="paymentConfirmed = true" />
      </div>
    </div>
    <div v-else>
      <div class="card">
        <DonateThanks />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DonateForm from '@/components/donate/DonateFormComponent.vue'
import DonateResult from '@/components/donate/DonateCheckoutComponent.vue'
import DonateThanks from '@/components/donate/DonateThanksComponent.vue'
import DonateUnavailable from '@/components/donate/DonateUnavaliableComponent.vue'
import Back from '@/services/BackendService'
import Toast from '@/services/ToastsService'

export default defineComponent({
  components: { DonateForm, DonateResult, DonateThanks, DonateUnavailable },
  data() {
    return {
      donationResult: null as any,
      paymentConfirmed: false,
      backendUp: true,
    }
  },
  methods: {
    async handleDonate(formData: any) {
      Back.BackEndV1('post', '/donates', formData, false)
        .then((r) => {
          this.donationResult = r.data
          console.log(this.donationResult)
          localStorage.setItem('donateInProgress', this.donationResult.donate_id)
        })
        .catch((e) => {
          Toast.error(e.request.response)
        })
    },
    async checkBackend() {
      Back.BackEnd('get', '/up', null, false)
        .then((r) => {
          this.backendUp = true
          console.log('Conectado!')
        })
        .catch((e) => {
          this.backendUp = false
        })
    },
    handlePaymentConfirmed() {
      this.paymentConfirmed = true
    },
  },
  async beforeMount() {
    await this.checkBackend()
  },
})
</script>
