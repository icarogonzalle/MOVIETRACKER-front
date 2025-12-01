<script setup lang="ts">
import { ref } from 'vue'

// Mock de usuário – depois você troca por dados vindos da API
const user = ref({
  name: 'Ícaro Gonzalle',
  username: 'icaroazevedo_',
  email: 'icaro@example.com',
  bio: 'Backend dev, movie nerd & future fullstack specialist.',
  location: 'Brasil',
  joinedAt: 'Entrou em julho de 2024',
  avatarUrl: '', // coloca uma URL se quiser testar com imagem
  stats: {
    favorites: 24,
    reviews: 11,
    watchlist: 37,
  },
})

// Mock de atividade recente
const activity = ref([
  { id: 1, action: 'Adicionou "Inception (2010)" aos favoritos', time: 'há 2 dias' },
  { id: 2, action: 'Fez uma review de "Oppenheimer (2023)"', time: 'há 5 dias' },
  { id: 3, action: 'Assistiu "The Dark Knight (2008)"', time: 'há 1 semana' },
])

// Mock de gêneros favoritos – só pra enriquecer a página
const favoriteGenres = ref(['Sci-Fi', 'Drama', 'Thriller', 'Biografia'])
</script>

<template>
  <!-- Header semelhante ao topo do perfil do GitHub -->
  <section class="mb-8">
    <h1 class="text-2xl md:text-3xl font-semibold">Perfil</h1>
    <p class="text-slate-300 text-sm md:text-base">
      Veja e gerencie suas preferências, favoritos e atividade no MovieTracker.
    </p>
  </section>

  <section class="grid gap-8 md:grid-cols-[minmax(0,280px),1fr] items-start">
    <!-- Coluna esquerda – avatar, nome, bio, stats -->
    <aside>
      <!-- Card principal do usuário -->
      <div class="bg-[#12142a] border border-white/10 rounded-2xl p-5 shadow-lg">
        <!-- Avatar -->
        <div class="flex flex-col items-center text-center mb-4">
          <div
            class="h-32 w-32 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-3xl font-bold text-white mb-3 border border-white/20 overflow-hidden"
          >
            <img
              v-if="user.avatarUrl"
              :src="user.avatarUrl"
              :alt="user.name"
              class="h-full w-full object-cover"
            />
            <span v-else>
              {{ user.name[0] }}
            </span>
          </div>

          <h2 class="text-xl font-semibold text-white">
            {{ user.name }}
          </h2>
          <p class="text-sm text-slate-400">@{{ user.username }}</p>
        </div>

        <!-- Bio -->
        <p class="text-sm text-slate-200 mb-4">
          {{ user.bio }}
        </p>

        <!-- Info tipo GitHub: location / joined -->
        <div class="space-y-1 text-sm text-slate-300 mb-4">
          <p><span class="opacity-70 mr-1">📍</span>{{ user.location }}</p>
          <p><span class="opacity-70 mr-1">📅</span>{{ user.joinedAt }}</p>
          <p><span class="opacity-70 mr-1">✉️</span>{{ user.email }}</p>
        </div>

        <!-- Stats estilo GitHub counters -->
        <div class="mt-4 grid grid-cols-3 gap-2 text-center text-xs bg-black/20 rounded-xl p-2">
          <div>
            <p class="text-slate-400 mb-1">Favoritos</p>
            <p class="text-lg font-semibold text-white">
              {{ user.stats.favorites }}
            </p>
          </div>
          <div>
            <p class="text-slate-400 mb-1">Reviews</p>
            <p class="text-lg font-semibold text-white">
              {{ user.stats.reviews }}
            </p>
          </div>
          <div>
            <p class="text-slate-400 mb-1">Watchlist</p>
            <p class="text-lg font-semibold text-white">
              {{ user.stats.watchlist }}
            </p>
          </div>
        </div>
      </div>

      <!-- Gêneros favoritos -->
      <div class="mt-4 bg-[#12142a] border border-white/10 rounded-2xl p-4 text-sm">
        <h3 class="text-slate-100 font-semibold mb-3">Gêneros favoritos</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="g in favoriteGenres"
            :key="g"
            class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-100"
          >
            {{ g }}
          </span>
        </div>
      </div>
    </aside>

    <!-- Coluna direita – tabs + atividade + favoritos -->
    <section class="space-y-6">
      <!-- “Tabs” estilo GitHub (por enquanto só visual) -->
      <div class="flex flex-wrap border-b border-white/10 text-sm font-medium">
        <button class="px-4 py-2 border-b-2 border-green-400 text-green-400">Visão geral</button>
        <button class="px-4 py-2 text-slate-300 hover:text-white transition">Favoritos</button>
        <button class="px-4 py-2 text-slate-300 hover:text-white transition">Reviews</button>
      </div>

      <!-- Card: atividade recente -->
      <div class="bg-[#12142a] border border-white/10 rounded-2xl p-5 shadow-md">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-slate-100 font-semibold">Atividade recente</h3>
          <span class="text-xs text-slate-400">últimos 7 dias</span>
        </div>

        <ul class="space-y-3 text-sm">
          <li v-for="item in activity" :key="item.id" class="flex items-start gap-3">
            <div class="mt-1 h-2 w-2 rounded-full bg-green-400 flex-shrink-0"></div>
            <div>
              <p class="text-slate-100">
                {{ item.action }}
              </p>
              <p class="text-xs text-slate-400">
                {{ item.time }}
              </p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Card: resumo de favoritos -->
      <div class="bg-[#12142a] border border-white/10 rounded-2xl p-5 shadow-md">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-slate-100 font-semibold">Destaques dos seus favoritos</h3>
          <button class="text-xs text-green-400 hover:text-green-300">Ver todos</button>
        </div>

        <p class="text-sm text-slate-300 mb-3">
          Em breve aqui você verá uma vitrine com seus filmes favoritos e recomendações baseadas
          neles.
        </p>

        <div
          class="h-24 rounded-xl border border-dashed border-white/15 flex items-center justify-center text-xs text-slate-500"
        >
          Conecte essa seção com a API de favoritos do backend.
        </div>
      </div>
    </section>
  </section>
</template>
