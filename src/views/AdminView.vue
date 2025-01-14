<template>
  <div>
    <TopbarComponent></TopbarComponent>
  </div>
  <div>
    <AdminDashboardComponent></AdminDashboardComponent>
  </div>
</template>

<script lang="ts">
import AdminDashboardComponent from '@/components/admin/AdminDashboardComponent.vue'
import TopbarComponent from '@/components/admin/TopbarComponent.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { TopbarComponent, AdminDashboardComponent },
})
</script>
