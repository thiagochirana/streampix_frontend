<template>
  <div class="form-content">
    <h1 class="text-center">Apoia o DevCurumin aí!</h1>
    <h5 class="text-center italic text-gray-400">{{ randomTitle() }}</h5>
    <br />
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nickname">Nickname:</label>
        <input id="nickname" v-model="form.nickname" required />
      </div>
      <div class="form-group">
        <label for="value">Value:</label>
        <input
          id="value"
          type="number"
          step="0.01"
          v-model="form.value"
          @input="validateInput"
          required
        />
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" v-model="form.message" required></textarea>
      </div>
      <button type="submit">Donate</button>
    </form>
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
        value: 0,
        message: '',
      },
    }
  },
  methods: {
    submitForm() {
      this.onDonate(this.form)
    },
    validateInput() {
      let formattedValue = this.form.value.replace(/[^0-9,]/g, '')
      // formattedValue = formattedValue.replace(',', '.')

      const regex = /^(\d+(\.\d{0,2})?)$/
      if (!regex.test(formattedValue)) {
        formattedValue = formattedValue.slice(0, formattedValue.length - 1)
      }

      this.form.value = formattedValue
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
