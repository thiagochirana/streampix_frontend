<template>
  <div class="form-content">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nickname">Email ou Nickname:</label>
        <input id="nickname" v-model="form.login" required />
      </div>
      <div class="form-group">
        <label for="value">Senha:</label>
        <div style="display: flex; align-items: center">
          <input
            id="value"
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            required
          />
        </div>
      </div>
      <button type="submit">Access this shit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ApiBackend from '@/services/BackendService'
import Toast from '@/services/ToastsService'

export default defineComponent({
  data() {
    return {
      form: {
        login: '',
        password: '',
      },
      showPassword: false,
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    submitForm() {
      ApiBackend.V1('post', '/auth/login', this.form, false)
        .then((r) => {
          Toast.ok(r.data.message)
        })
        .catch((error) => {
          Toast.error(error.request.response)
        })
    },
  },
})
</script>
