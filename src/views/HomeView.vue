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
          Acompanhe seus favoritos, veja recomendações e continue de onde parou com o MovieTracker.
        </p>

        <!-- Call-to-action simples para o catálogo -->
        <div class="mt-4">
          <router-link
            to="/movies"
            class="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-semibold transition"
          >
            Ir para o catálogo de filmes
          </router-link>
        </div>
      </div>

      <!-- Card destaque -->
      <div
        class="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-4 shadow-lg"
      >
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Último favorito</p>

        <div v-if="highlightMovie" class="space-y-3">
          <p class="text-lg font-semibold">
            {{ highlightMovie.title }}
          </p>
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
import { getAllMovies, type MovieDTO } from '@/services/movieService'

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

const popularMovies = ref<Movie[]>([])
const recommendedMovies = ref<Movie[]>([])
const favoriteMovies = ref<Movie[]>([])
const highlightMovie = ref<Movie | null>(null)

// converte o MovieDTO do backend para o Movie usado na Home
function mapDtoToMovie(dto: MovieDTO): Movie {
  return {
    id: dto.id,
    title: dto.title,
    year: dto.year ? String(dto.year) : '',
    // por enquanto deixamos esses campos vazios
    runtime: '',
    imdbRating: '',
    plot: '',
    poster: dto.poster ?? undefined,
    favorite: false, // depois dá pra puxar dos favoritos do usuário
  }
}
const loadData = async () => {
  // busca todos os filmes do backend
  const dtos = await getAllMovies()
  const all = dtos.map(mapDtoToMovie)

  // regra simples só pra preencher as seções:
  popularMovies.value = all.slice(0, 4) // primeiros 4
  recommendedMovies.value = all.slice(2, 6) // 4 seguintes como recomendação
  favoriteMovies.value = all.slice(0, 3) // por enquanto, 3 primeiros como "favoritos"

  // destaque da direita ("último favorito" / hero card)
  highlightMovie.value = favoriteMovies.value[0] ?? popularMovies.value[0] ?? null
}

onMounted(loadData)
</script>
