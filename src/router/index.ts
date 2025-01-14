import DonateView from '@/views/DonateView.vue'
import AdminView from '@/views/AdminView.vue'
import SessionView from '@/views/SessionView.vue'
import AlertsView from '@/views/AlertsView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/store/auth.store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DonateView,
    },
    {
      path: '/admin',
      component: AdminView,
      beforeEnter: () => {
        const sessionStore = useSessionStore()
        return sessionStore.isLoggedIn;
      },
    },
    {
      path: '/login',
      component: SessionView,
    },
    {
      path: '/alert',
      component: AlertsView,
    },
  ],
})

export default router
