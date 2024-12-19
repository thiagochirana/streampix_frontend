<template>
  <div class="form-content">
    <h1>Thanks, agora me pague!</h1>
    <div v-html="result.qr_code_svg"></div>

    <span class="text-sm">Scaneie o QrCode acima ou copie a chave Copia e Cola</span>

    <label for="pix-copia-cola" class="label">Pix Copia e Cola:</label>
    <input
      id="pix-copia-cola"
      type="text"
      class="input"
      :value="result.pix_copia_cola"
      readonly
      @click="copyToClipboard"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Swal from 'sweetalert2'

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
          Swal.fire({
            title: 'Copiado!',
            text: 'A chave Pix foi copiada para sua área de transferência.',
            icon: 'success',
            toast: true,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false,
          })
        })
        .catch((error) => {
          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível copiar a chave Pix.',
            icon: 'error',
          })
        })
    },
  },
})
</script>

<style scoped>
.label {
  font-weight: bold;
  margin-bottom: 4px;
  display: block;
}

.input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.input:focus {
  outline: none;
  border-color: #007bff;
}
</style>
