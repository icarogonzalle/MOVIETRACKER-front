<template>
  <section class="space-y-10">
    <!-- Hero -->
    <div class="grid md:grid-cols-[2fr,1fr] gap-8 items-center">
      <div class="space-y-4">
        <p class="text-sm font-medium text-emerald-400 uppercase tracking-[0.2em]">
          Bem-vindo de volta
        </p>
        <h1 class="text-3xl md:text-4xl font-bold leading-tight">
          Encontre, salve e descubra
          <span class="text-emerald-400">novos filmes</span>
          em segundos.
        </h1>
        <p class="text-sm md:text-base text-slate-300 max-w-xl">
          Pesquise por título, veja detalhes pela API, e mantenha sua lista de favoritos
          sincronizada com o MovieTracker.
        </p>

        <!-- Busca rápida -->
        <form @submit.prevent="onSearch" class="flex flex-col sm:flex-row gap-3 mt-4">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Buscar por título (ex: Inception)"
            class="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            class="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-semibold"
          >
            Buscar
          </button>
        </form>
      </div>

      <!-- Card destaque -->
      <div
        class="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-4 shadow-lg"
      >
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Último favorito</p>

        <p v-if="highlightMovie" class="text-lg font-semibold">
          {{ highlightMovie.title }}
        </p>

        <div v-if="highlightMovie" class="space-y-3">
          <p class="text-lg font-semibold">{{ highlightMovie.title }}</p>
          <p class="text-xs text-slate-300">
            {{ highlightMovie.year }} • {{ highlightMovie.runtime }} • IMDb
            {{ highlightMovie.imdbRating }}
          </p>

          <p class="text-xs text-slate-400 line-clamp-3">
            {{ highlightMovie.plot }}
          </p>

          <button
            class="mt-2 text-xs px-3 py-1 rounded-full bg-slate-900 border border-emerald-500 text-emerald-400"
          >
            Ver detalhes
          </button>
        </div>

        <p v-else class="text-sm text-slate-400">
          Nenhum favorito ainda. Comece adicionando um filme à sua lista!
        </p>
      </div>
    </div>

    <!-- Vitrines -->
    <div class="space-y-8">
      <MovieCarousel title="Populares hoje" :movies="popularMovies" />
      <MovieCarousel title="Recomendados para você" :movies="recommendedMovies" />
      <MovieCarousel title="Seus favoritos" :movies="favoriteMovies" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MovieCarousel from '@/components/movies/MovieCarousel.vue'
import {
  //getPopularMovies,
  //getRecommendedMovies,
  //getFavoriteMovies,
  searchMovie,
} from '../services/movieService'

// Tipo básico do filme (ajuste conforme o que a sua API retorna)
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

const searchTerm = ref('')

// Agora tudo tipado 👇
const popularMovies = ref<Movie[]>([])
const recommendedMovies = ref<Movie[]>([])
const favoriteMovies = ref<Movie[]>([])
const highlightMovie = ref<Movie | null>(null)

const loadData = async () => {
  popularMovies.value = [
    {
      id: 1,
      title: 'Inception',
      year: '2010',
      runtime: '148 min',
      imdbRating: '8.8',
      plot: 'Um ladrão que rouba segredos através de sonhos...',
      poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmYt.jpg',
      favorite: false,
    },
    {
      id: 2,
      title: 'The Matrix',
      year: '1999',
      runtime: '136 min',
      imdbRating: '8.7',
      plot: 'Um hacker descobre a verdadeira natureza da realidade...',
      poster: '',
      favorite: true,
    },
  ]

  recommendedMovies.value = popularMovies.value
  favoriteMovies.value = popularMovies.value.filter((m) => m.favorite)
  highlightMovie.value = favoriteMovies.value[0] ?? null
}

const onSearch = async () => {
  if (!searchTerm.value) return
  const result = await searchMovie(searchTerm.value)
  console.log('Resultado da busca:', result)
  // aqui depois você decide o que fazer com o resultado
}

onMounted(loadData)
</script>
