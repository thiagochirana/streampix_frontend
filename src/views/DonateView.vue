<template>
  <div class="flex justify-center pt-10 phone:m-5 phone:pt-3">
    <DonateUnavailable v-if="!backendUp" />
    <div v-else-if="!donationResult">
      <div>
        <DonateForm :onDonate="handleDonate" />
        <DonateTable></DonateTable>
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
      ApiBackend.Root('get', '/up', null)
        .then(() => {
          // so, do a request
          ApiBackend.V1('post', '/donates', formData, false)
            .then((r) => {
              this.donationResult = r.data
              console.log(this.donationResult)
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
      ApiBackend.Root('get', '/up', null)
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
