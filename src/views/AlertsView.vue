<template>
  <div v-if="showAlert" class="alert-container animate-bounce">
    <div class="alert-box bg-yellow-400 text-black p-5 rounded-lg shadow-lg">
      <p class="text-xl font-bold">{{ alert.nickname }} doou R${{ alert.value }}</p>
      <p class="italic">{{ alert.message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AlertService from '@/services/AlertService'

export default defineComponent({
  data() {
    return {
      alert: {
        nickname: '',
        value: 0,
        message: '',
      },
      showAlert: false,
      audio: new Audio('/alert-sound.mp3'), // Adicione o som no diretório public
    }
  },
  mounted() {
    const alertKey = this.$route.params.alert_access_key // Obtém a chave da URL
    const service = new AlertService(alertKey, this.handleAlert)

    this.$once('hook:beforeUnmount', () => {
      service.unsubscribe()
    })
  },
  methods: {
    handleAlert(data: any) {
      this.alert = {
        nickname: data.nickname,
        value: data.value,
        message: data.message,
      }

      this.audio.play()
      this.showAlert = true

      setTimeout(() => {
        this.showAlert = false
        this.clearAlert()
      }, 5000)
    },
    clearAlert() {
      this.alert = {
        nickname: '',
        value: 0,
        message: '',
      }
    },
  },
})
</script>

<style>
.alert-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
