<template>
  <div v-if="showAlert" class="alert-container animate-bounce">
    <div
      :class="alert.classBg"
      class="alert-box text-black p-5 rounded-lg shadow-lg flex items-center justify-between w-full"
    >
      <!-- Texto do Alerta (lado esquerdo, ocupa espaço disponível) -->
      <div class="flex-1">
        <p class="text-xl font-bold">{{ alert.nickname }} doou R${{ alert.value }}</p>
        <p class="italic">{{ alert.message }}</p>
      </div>

      <!-- Ícone Pix (lado direito) -->
      <div class="flex-shrink-0 ml-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          class="w-10 h-10 text-black"
        >
          <path
            d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 372.6 391.5 392.6 391.5H407.7L310.6 488.6C280.3 518.1 231.1 518.1 200.8 488.6L103.3 391.2H112.6C132.6 391.2 151.5 383.4 165.7 369.2L242.4 292.5zM262.5 218.9C256.1 224.4 247.9 224.5 242.4 218.9L165.7 142.2C151.5 127.1 132.6 120.2 112.6 120.2H103.3L200.7 22.8C231.1-7.6 280.3-7.6 310.6 22.8L407.8 119.9H392.6C372.6 119.9 353.7 127.7 339.5 141.9L262.5 218.9zM112.6 142.7C126.4 142.7 139.1 148.3 149.7 158.1L226.4 234.8C233.6 241.1 243 245.6 252.5 245.6C261.9 245.6 271.3 241.1 278.5 234.8L355.5 157.8C365.3 148.1 378.8 142.5 392.6 142.5H430.3L488.6 200.8C518.9 231.1 518.9 280.3 488.6 310.6L430.3 368.9H392.6C378.8 368.9 365.3 363.3 355.5 353.5L278.5 276.5C264.6 262.6 240.3 262.6 226.4 276.6L149.7 353.2C139.1 363 126.4 368.6 112.6 368.6H80.8L22.8 310.6C-7.6 280.3-7.6 231.1 22.8 200.8L80.8 142.7H112.6z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CableService from '@/services/CableService'
import type { Subscription } from '@rails/actioncable'

export default defineComponent({
  data() {
    return {
      alert: {
        nickname: '',
        value: 0,
        message: '',
        classBg: '',
      },
      showAlert: false,
      audio: new Audio('/alert-sound.mp3'),
      subscription: null as Subscription | null,
    }
  },
  mounted() {
    const alertKey = Array.isArray(this.$route.query.key)
      ? this.$route.query.key[0] + ''
      : this.$route.query.key || ''

    console.log(alertKey)

    const cable = CableService.createConsumerAlert(alertKey)

    this.subscription = cable.subscriptions.create(
      {
        channel: 'DonationAlertChannel',
        alert_access_key: alertKey,
      },
      {
        received: (data: { nickname: string; value: number; message: string }) => {
          this.handleAlert(data)
        },
      },
    )
  },
  beforeUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  },
  methods: {
    handleAlert(data: { nickname: string; value: number; message: string }) {
      this.alert = {
        nickname: data.nickname,
        value: data.value,
        message: data.message,
        classBg: this.randomBgColor(),
      }

      this.audio.play()
      this.showAlert = true

      setTimeout(() => {
        this.showAlert = false
        this.clearAlert()
      }, 10000)
    },
    clearAlert() {
      this.alert = {
        nickname: '',
        value: 0,
        message: '',
        classBg: '',
      }
    },
    randomBgColor() {
      const bgs = ['bg-yellow-400', 'bg-red-300', 'bg-purple-300', 'bg-green-300', 'bg-blue-300']
      return bgs[Math.floor(Math.random() * bgs.length)]
    },
  },
})
</script>

<style>
.alert-container {
  /* position: fixed;
  bottom: 20px;
  right: 20px; */
  padding-top: 11px;
  z-index: 9999;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
