<template>
  <div>
    <h1>hello chat!</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ApiBackend from '@/services/BackendService'

export default defineComponent({
  data() {
    return {
      donates: {},
      total: 0.0,
      total_paids: 0.0,
      total_non_paids: 0.0,
      pagination: {
        current_page: 0,
        per_page: 0,
        total_pages: 0,
        total_records: 0
      }
    }
  },
  methods: {

  }
})
</script>
