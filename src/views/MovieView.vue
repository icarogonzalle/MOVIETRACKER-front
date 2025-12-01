<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import MovieCarousel from '@/components/movies/MovieCarousel.vue'
import { getAllMovies, searchMovies, type MovieDTO } from '@/services/movieService'

// Mesmo tipo base do MovieCarousel, com alguns campos extras
interface Movie {
  id: number
  title: string
  year?: string
  runtime?: string
  imdbRating?: string
  plot?: string
  poster?: string
  favorite?: boolean
  genres: string[]
  section: string
}

// estado vindo da API
const allMovies = ref<Movie[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// busca
const searchTerm = ref('')

// --- helpers de mapeamento ---

function inferSection(genres: string[], year: number | null | undefined): string {
  const y = year ?? 0

  if (
    genres.includes('Sci-Fi') ||
    genres.includes('Sci Fi') ||
    genres.includes('Science Fiction')
  ) {
    return 'Sci-Fi & Espaço'
  }

  if (genres.includes('Animação') || genres.includes('Animation') || genres.includes('Família')) {
    return 'Para ver em família'
  }

  if (y >= 2022) {
    return 'Lançamentos em destaque'
  }

  if (y > 0 && y < 2010) {
    return 'Clássicos essenciais'
  }

  return 'Populares agora'
}

function mapDtoToMovie(dto: MovieDTO): Movie {
  const genres = dto.genre
    ?.split(',')
    .map((g) => g.trim())
    .filter(Boolean) ?? ['Outros']

  const section = inferSection(genres, dto.year)

  return {
    id: dto.id,
    title: dto.title,
    year: dto.year ? String(dto.year) : undefined,
    // runtime / imdbRating / plot viriam de outro endpoint se você quiser depois
    poster: dto.poster ?? undefined,
    favorite: false,
    genres,
    section,
  }
}

// --- carregamento da API ---

async function loadMovies(query?: string) {
  loading.value = true
  error.value = null

  try {
    const dtos =
      query && query.trim().length > 0 ? await searchMovies(query.trim()) : await getAllMovies()

    allMovies.value = dtos.map(mapDtoToMovie)
  } catch (e) {
    console.error(e)
    error.value = 'Não foi possível carregar os filmes. Tente novamente mais tarde.'
  } finally {
    loading.value = false
  }
}

async function onSearch() {
  await loadMovies(searchTerm.value)
}

// --- filtros de gênero / seções ---

// gera lista de gêneros dinamicamente a partir dos filmes
const genres = computed<string[]>(() => {
  const set = new Set<string>()
  allMovies.value.forEach((m) => m.genres.forEach((g) => set.add(g)))
  return ['Todos', ...Array.from(set).sort()]
})

const selectedGenre = ref<string>('Todos')

const filteredMovies = computed(() => {
  if (selectedGenre.value === 'Todos') return allMovies.value
  return allMovies.value.filter((m) => m.genres.includes(selectedGenre.value))
})

// seções que viram carrosséis
const sections = computed(() => {
  const unique = new Set(filteredMovies.value.map((m) => m.section))
  return Array.from(unique)
})

// mapa seção -> filmes
const moviesBySection = computed<Record<string, Movie[]>>(() => {
  const map: Record<string, Movie[]> = {}

  for (const movie of filteredMovies.value) {
    const section = movie.section
    const list = map[section] ?? (map[section] = [])
    list.push(movie)
  }

  return map
})

onMounted(() => {
  loadMovies()
})
</script>

<template>
  <section class="space-y-8">
    <!-- Cabeçalho da página -->
    <header class="space-y-2">
      <h1 class="text-2xl md:text-3xl font-semibold">Catálogo de filmes</h1>
      <p class="text-slate-300 text-sm md:text-base max-w-2xl">
        Navegue pelo catálogo de filmes do MovieTracker. Use a busca e os filtros por gênero para
        encontrar rapidamente o próximo filme que você quer assistir.
      </p>

      <!-- Barra de busca -->
      <form @submit.prevent="onSearch" class="flex items-center gap-3 mt-6 max-w-xl">
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

      <!-- mensagens de estado -->
      <p v-if="loading" class="text-xs text-slate-400 mt-1">Carregando filmes...</p>
      <p v-if="error" class="text-xs text-red-400 mt-1">
        {{ error }}
      </p>
    </header>

    <!-- Filtro de gêneros -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="genre in genres"
        :key="genre"
        class="px-3 py-1 rounded-full text-xs md:text-sm border transition border-white/10 bg-white/5 text-slate-200 hover:border-emerald-400 hover:text-emerald-300"
        :class="{
          'bg-emerald-500/20 border-emerald-400 text-emerald-200': selectedGenre === genre,
        }"
        @click="selectedGenre = genre"
      >
        {{ genre }}
      </button>
    </div>

    <!-- Carrosséis por seção -->
    <div class="space-y-8" v-if="sections.length">
      <MovieCarousel
        v-for="section in sections"
        :key="section"
        :title="section"
        :movies="moviesBySection[section] || []"
      />
    </div>

    <!-- Sem resultados -->
    <p v-else-if="!loading" class="text-sm text-slate-400">
      Nenhum filme encontrado para o filtro/busca atual.
    </p>
  </section>
</template>
