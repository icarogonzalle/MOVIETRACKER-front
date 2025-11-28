<template>
  <header
    class="fixed top-0 inset-x-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800"
  >
    <nav class="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <img src="/logo.png" alt="MovieTracker" class="h-8 w-8 rounded" />
        <span class="font-semibold text-lg">MovieTracker</span>
      </div>

      <!-- Links -->
      <ul class="hidden md:flex items-center gap-6 text-sm">
        <RouterLink to="/home" class="hover:text-emerald-400 transition-colors"> Home </RouterLink>
        <RouterLink to="/movies" class="hover:text-emerald-400 transition-colors">
          Filmes
        </RouterLink>
        <RouterLink to="/series" class="hover:text-emerald-400 transition-colors">
          Séries
        </RouterLink>
        <RouterLink to="/for-you" class="hover:text-emerald-400 transition-colors">
          For You
        </RouterLink>
      </ul>

      <!-- Perfil / Login -->
      <div class="flex items-center gap-3">
        <button
          class="hidden md:inline-flex text-sm px-3 py-1 rounded-full border border-slate-600 hover:border-emerald-400"
        >
          Entrar
        </button>

        <RouterLink
          to="/profile"
          class="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center text-xs font-medium"
        >
          IG
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
