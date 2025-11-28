<template>
  <article class="min-w-[150px] max-w-[160px]">
    <div
      class="relative aspect-[2/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-800"
    >
      <img
        v-if="movie.poster"
        :src="movie.poster"
        :alt="movie.title"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-xs text-slate-500">
        Sem poster
      </div>

      <button
        class="absolute top-2 right-2 h-7 w-7 rounded-full bg-slate-900/80 flex items-center justify-center text-xs"
      >
        <span v-if="movie.favorite">★</span>
        <span v-else>☆</span>
      </button>
    </div>

    <div class="mt-2 space-y-1">
      <p class="text-xs font-semibold line-clamp-2">{{ movie.title }}</p>
      <p class="text-[11px] text-slate-400">
        {{ movie.year }} • IMDb {{ movie.imdbRating || 'N/A' }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
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

defineProps<{
  movie: Movie
}>()
</script>
