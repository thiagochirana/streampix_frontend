<template>
  <div class="form-content">
    <h1>Do a don</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nickname">Nickname:</label>
        <input id="nickname" v-model="form.nickname" required />
      </div>
      <div class="form-group">
        <label for="value">Value:</label>
        <input id="value" type="number" step="0.01" v-model="form.value" required />
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
  },
})
</script>
