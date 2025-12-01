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
        class="absolute top-2 right-2 rounded-full px-2 py-1 text-xs"
        :class="isFavorite ? 'bg-emerald-500 text-black' : 'bg-black/40 text-slate-200'"
        @click.stop="onToggleFavorite"
      >
        ★
      </button>
    </div>

    <div class="mt-2 space-y-1">
      <p class="text-xs font-semibold line-clamp-2">
        {{ movie.title }}
      </p>
      <p class="text-[11px] text-slate-400">
        {{ movie.year }} • IMDb {{ movie.imdbRating || 'N/A' }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toggleFavoriteMovie } from '@/services/userService'

interface Movie {
  id: number
  title: string
  year?: string
  poster?: string
  favorite?: boolean
  imdbRating?: string
}

const props = defineProps<{
  movie: Movie
  userId?: number // depois vem do store/login
}>()

// estado local só pra controlar o visual da estrela
const isFavorite = ref(!!props.movie.favorite)

const emit = defineEmits<{
  (e: 'favorite-changed', value: boolean): void
}>()

async function onToggleFavorite() {
  if (!props.userId) {
    console.warn('Usuário não logado')
    return
  }

  // otimista: muda a UI antes da resposta
  isFavorite.value = !isFavorite.value
  emit('favorite-changed', isFavorite.value)

  try {
    await toggleFavoriteMovie(props.userId, props.movie.id)
    // aqui daria pra usar o UserDTO retornado pra atualizar um store global
  } catch (e) {
    console.error(e)
    // rollback se der erro
    isFavorite.value = !isFavorite.value
    emit('favorite-changed', isFavorite.value)
  }
}
</script>
