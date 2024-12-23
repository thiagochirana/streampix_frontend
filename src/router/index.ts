import DonateView from '@/views/DonateView.vue'
import AdminView from '@/views/AdminView.vue'
import SessionView from '@/views/SessionView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DonateView,
    },
    {
      path: '/admin',
      component: AdminView,
    },
    {
      path: '/you',
      component: SessionView,
    },
  ],
})

export default router
