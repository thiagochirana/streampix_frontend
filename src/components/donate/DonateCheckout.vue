<template>
  <div>
    <h2>Thanks bro! Agora me pague!</h2>
    <span class="text">Scaneie o QrCode abaixo ou copie a chave Copia e Cola</span>
    <p><strong>Pix Copia e Cola:</strong> {{ result.pix_copia_cola }}</p>
    <img :src="result.qrcode" alt="QR Code" />
    <p><strong>Nickname:</strong> {{ result.nickname }}</p>
    <p><strong>Value:</strong> {{ result.value }}</p>
    <p><strong>Message:</strong> {{ result.message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
});
</script>
