<template>
  <div class="form-content w-auto max-w-96">
    <h1 class="text-center">Thanks, agora me pague!</h1>

    <div class="" v-html="result.qr_code_svg"></div>

    <br />

    <span class="text-sm italic text-gray-400">
      Scaneie o QrCode acima ou copie a chave Copia e Cola
    </span>

    <label for="pix-copia-cola" class="label">Pix Copia e Cola:</label>

    <textarea
      id="pix-copia-cola"
      type="text"
      class="input"
      :value="result.pix_copia_cola"
      readonly
      @click="copyToClipboard"
    />

    <span class="text-sm italic text-gray-400 text-center justify-center">
      Clique na caixa de texto acima e será copiado automaticamente
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from '@/services/ToastsService'

export default defineComponent({
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  methods: {
    copyToClipboard() {
      const textToCopy = this.result.pix_copia_cola
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          Toast.ok('Chave Copia e Cola foi copiado!')
        })
        .catch(() => {
          Toast.error('Houve um erro ao tentar copiar a chave Copia e Cola')
        })
    },
  },
})
</script>

<style scoped>
.label {
  @apply mb-4 mt-4 text-center font-bold;
}

.input {
  font-size: 14px;
  cursor: pointer;
}

.input:focus {
  outline: none;
  border-color: #007bff;
}
</style>
