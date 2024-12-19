<template>
  <div id="DonateView">
    <div class="DonateField" v-if="!donationResult">
      <DonateForm :onDonate="handleDonate" />
    </div>
    <div v-else>
      <DonateResult :result="donationResult" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DonateForm from "@/components/donate/DonateForm.vue";
import DonateResult from "@/components/donate/DonateCheckout.vue";
import axios from "axios";

export default defineComponent({
  components: { DonateForm, DonateResult },
  data() {
    return {
      donationResult: null as any,
    };
  },
  methods: {
    async handleDonate(formData: any) {
      try {
        const response = await axios.post("http://localhost:3000/backend/v1/donates", { donate: formData });
        this.donationResult = response.data.donate;
      } catch (error) {
        console.error("Donation failed:", error);
      }
    },
  },
});
</script>

<style scoped>
#DonateView {
  @apply flex pt-5 pb-5 h-screen justify-center;
}

.DonateField {
  max-width: 700px;
  width: 100%;
  @apply bg-white p-4 drop-shadow rounded;
}
</style>
