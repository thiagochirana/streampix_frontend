<template>
  <div class="flex justify-center pt-10 sm:pt-10 h-screen bg-purple-900">
    <DonateUnavailable v-if="!backendUp" />
    <div v-else-if="!donationResult">
      <div class="">
        <DonateForm :onDonate="handleDonate" />
        <DonateTable class="mt-4" />
      </div>
    </div>
    <div v-else-if="!paymentConfirmed">
      <DonateResult :result="donationResult" @paymentConfirmed="paymentConfirmed = true" />
    </div>
    <div v-else>
      <DonateThanks />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DonateForm from '@/components/donate/DonateFormComponent.vue'
import DonateResult from '@/components/donate/DonateCheckoutComponent.vue'
import DonateThanks from '@/components/donate/DonateThanksComponent.vue'
import DonateUnavailable from '@/components/donate/DonateUnavaliableComponent.vue'
import DonateTable from '@/components/donate/DonateTableDonationsMonthComponent.vue'
import ApiBackend from '@/services/BackendService'
import Toast from '@/services/ToastsService'

export default defineComponent({
  components: { DonateForm, DonateResult, DonateThanks, DonateUnavailable, DonateTable },
  data() {
    return {
      donationResult: null as any,
      paymentConfirmed: false,
      backendUp: true,
    }
  },
  methods: {
    async handleDonate(formData: any) {
      // first, check if API is on
      ApiBackend.Root('get', '/up', {})
        .then(() => {
          // so, do a request
          ApiBackend.V1('post', '/donates', formData, false)
            .then((r) => {
              this.donationResult = r.data
              localStorage.setItem('donateInProgress', this.donationResult.donate_id)
            })
            .catch((e) => {
              Toast.error(e.request.response)
            })
        })
        .catch(() => {
          this.backendUp = false
        })
    },
    async checkBackend() {
      ApiBackend.Root('get', '/up', {})
        .then(() => {
          this.backendUp = true
        })
        .catch(() => {
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
