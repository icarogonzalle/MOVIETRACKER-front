<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <NavigationBar />

    <main class="pt-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
</script>
