<template>
  <div class="card">
    <div class="form-content">
      <h1 class="text-center">Apoie o DevCurumin aí!</h1>
      <h5 class="text-center italic text-gray-400">{{ randomTitle() }}</h5>
      <br />
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nickname">Seu Nickname:</label>
          <input id="nickname" v-model="form.nickname" required />
        </div>
        <div class="form-group">
          <label for="value">Valor (R$):</label>
          <input id="value" type="text" v-model="form.value" @input="validateInput" required />
        </div>
        <div class="form-group">
          <label for="message">Mensagem para Live:</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>
        <button type="submit">Donate</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    onDonate: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      form: {
        nickname: '',
        value: '',
        message: '',
      },
    }
  },
  methods: {
    submitForm() {
      this.onDonate(this.form)
    },
    validateInput() {
      const formattedValue = this.form.value
        .replace(/[^0-9,]/g, '')
        .replace(/,+/g, ',')
        .replace(/,(?=.*,)/g, '')

      const parts = formattedValue.split(',')
      if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 2)
      }

      this.form.value = parts.join(',')
    },
    randomTitle() {
      const phrases = [
        'Cincão no Pix agora, manda ver!',
        'Doe para o dev mais indío que existe',
        'Sem miséria, falou?',
        '50ntão e você estará no meu coração ♥️',
        '100nzão e você estará no meu coração ♥️',
      ]

      const ind: number = Math.floor(Math.random() * phrases.length)
      return phrases[ind]
    },
  },
})
</script>
