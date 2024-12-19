<template>

  <div class="form-content">
    <h1 class="text-xl font-bold mb-4">Make your don</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="nickname">Nickname:</label>
        <input
          id="nickname"
          v-model="form.nickname"
          required
        />
      </div>
      <div class="mb-4">
        <label for="value">Value:</label>
        <input
          id="value"
          type="number"
          step="0.01"
          v-model="form.value"
          required
        />
      </div>
      <div class="mb-4">
        <label for="message">Message:</label>
        <textarea
          id="message"
          v-model="form.message"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full py-2 bg-black text-gray-100 font-semibold rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
      >
        Donate
      </button>
    </form>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

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
        nickname: "",
        value: 0,
        message: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.onDonate(this.form);
    },
  },
});
</script>
