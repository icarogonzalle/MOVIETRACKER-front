<template>
  <section class="space-y-3">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <button class="text-xs text-slate-400 hover:text-emerald-400">Ver todos</button>
    </div>

    <!-- Lista horizontal -->
    <div class="flex gap-4 overflow-x-auto pb-2">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      <p v-if="!movies?.length" class="text-sm text-slate-400">Nenhum filme nesta seção.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import MovieCard from './MovieCard.vue'

// mesmo tipo usado na Home (pode extrair depois)
interface Movie {
  id: number
  title: string
  year?: string
  runtime?: string
  imdbRating?: string
  plot?: string
  poster?: string
  favorite?: boolean
}

// aqui está o pulo do gato 👇
// tipamos explicitamente as props
const { title, movies } = defineProps<{
  title: string
  movies: Movie[]
}>()
</script>
