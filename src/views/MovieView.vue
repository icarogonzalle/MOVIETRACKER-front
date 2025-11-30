<script setup lang="ts">
import { ref, computed } from 'vue'
import MovieCarousel from '@/components/movies/MovieCarousel.vue'

// Mesmo tipo base do MovieCarousel, com alguns campos extras
interface Movie {
  id: number
  title: string
  year?: string
  runtime?: string
  imdbRating?: string
  plot?: string
  poster?: string
  posterUrl?: string
  favorite?: boolean
  genres: string[] // 👈 para filtro
  section: string // 👈 para separar em carrosséis
}

// Mock de filmes – depois você pode trocar para dados da API
const allMovies = ref<Movie[]>([
  {
    id: 1,
    title: 'Inception',
    year: '2010',
    runtime: '148 min',
    imdbRating: '8.8',
    plot: 'Um ladrão invade sonhos para roubar segredos...',
    poster: 'https://via.placeholder.com/300x450?text=Inception',
    genres: ['Sci-Fi', 'Ação', 'Thriller'],
    section: 'Populares agora',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    year: '2008',
    runtime: '152 min',
    imdbRating: '9.0',
    plot: 'Batman enfrenta o Coringa em uma Gotham caótica.',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTYwNjU3MDk2.jpg',
    genres: ['Ação', 'Drama'],
    section: 'Populares agora',
  },
  {
    id: 3,
    title: 'Interstellar',
    year: '2014',
    runtime: '169 min',
    imdbRating: '8.6',
    plot: 'Exploradores viajam por um buraco de minhoca em busca de um novo lar.',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE.jpg',
    genres: ['Sci-Fi', 'Drama'],
    section: 'Sci-Fi & Espaço',
  },
  {
    id: 4,
    title: 'Oppenheimer',
    year: '2023',
    runtime: '3h',
    imdbRating: '8.3',
    plot: 'A história de J. Robert Oppenheimer e a criação da bomba atômica.',
    poster: 'https://m.media-amazon.com/images/M/MV5BZWU5MTY5ZmEt.jpg',
    genres: ['Drama', 'Biografia'],
    section: 'Lançamentos em destaque',
  },
  {
    id: 5,
    title: 'Tenet',
    year: '2020',
    runtime: '150 min',
    imdbRating: '7.3',
    plot: 'Um agente manipula o tempo para impedir a Terceira Guerra Mundial.',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDU3N2YxMmQt.jpg',
    genres: ['Sci-Fi', 'Ação'],
    section: 'Sci-Fi & Espaço',
  },
  {
    id: 6,
    title: 'Pulp Fiction',
    year: '1994',
    runtime: '154 min',
    imdbRating: '8.9',
    plot: 'Histórias entrelaçadas no submundo de Los Angeles.',
    poster: 'https://m.media-amazon.com/images/M/MV5BZjhkODI3NmEt.jpg',
    genres: ['Crime', 'Drama'],
    section: 'Clássicos essenciais',
  },
  {
    id: 7,
    title: 'Matrix',
    year: '1999',
    runtime: '136 min',
    imdbRating: '8.7',
    plot: 'Um hacker descobre a verdadeira natureza da realidade.',
    poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3NjAt.jpg',
    genres: ['Sci-Fi', 'Ação'],
    section: 'Clássicos essenciais',
  },
  {
    id: 8,
    title: 'Toy Story',
    year: '1995',
    runtime: '81 min',
    imdbRating: '8.3',
    plot: 'Os brinquedos ganham vida quando os humanos não estão olhando.',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjkt.jpg',
    genres: ['Animação', 'Família'],
    section: 'Para ver em família',
  },
])

// Filtros de gênero
const genres = ['Todos', 'Ação', 'Drama', 'Sci-Fi', 'Biografia', 'Crime', 'Animação']

const selectedGenre = ref<string>('Todos')

const filteredMovies = computed(() => {
  if (selectedGenre.value === 'Todos') return allMovies.value
  return allMovies.value.filter((m) => m.genres.includes(selectedGenre.value))
})

// Seções que viram carrosséis
const sections = computed(() => {
  const unique = new Set(filteredMovies.value.map((m) => m.section))
  return Array.from(unique)
})

// Mapa seção -> filmes
const moviesBySection = computed<Record<string, Movie[]>>(() => {
  const map: Record<string, Movie[]> = {}

  for (const movie of filteredMovies.value) {
    const section = movie.section

    // garante o array e devolve pra variável list
    const list = map[section] ?? (map[section] = [])

    list.push(movie)
  }

  return map
})
</script>

<template>
  <section class="space-y-8">
    <!-- Cabeçalho da página -->
    <header class="space-y-2">
      <h1 class="text-2xl md:text-3xl font-semibold">Catálogo de filmes</h1>
      <p class="text-slate-300 text-sm md:text-base max-w-2xl">
        Navegue pelo catálogo de filmes do MovieTracker. Use os filtros por gênero para encontrar
        rapidamente o tipo de filme que você quer assistir.
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
    <div class="space-y-8">
      <MovieCarousel
        v-for="section in sections"
        :key="section"
        :title="section"
        :movies="moviesBySection[section] || []"
      />
    </div>

    <!-- Sem resultados -->
    <p v-if="!sections.length" class="text-sm text-slate-400">
      Nenhum filme encontrado para o gênero selecionado.
    </p>
  </section>
</template>
