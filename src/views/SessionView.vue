<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">
        {{ isLogin ? 'Login' : 'Register' }}
      </h2>

      <LoginForm v-if="isLogin" @toggle-view="toggleView" />
      <RegisterForm v-else @toggle-view="toggleView" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginForm from '@/components/auth/LoginFormComponent.vue'
import RegisterForm from '@/components/auth/RegisterFormComponent.vue'

export default defineComponent({
  components: { LoginForm, RegisterForm },
  setup() {
    const isLogin = ref(true)

    const toggleView = () => {
      isLogin.value = !isLogin.value
    }

    return { isLogin, toggleView }
  },
})
</script>

<style scoped></style>
