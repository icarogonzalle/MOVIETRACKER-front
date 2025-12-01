<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1b254b] to-[#0d0f24] px-4"
  >
    <!-- Container central -->
    <div class="w-full max-w-5xl flex flex-col md:flex-row items-center gap-12">
      <!-- Lado esquerdo: branding / título -->
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-4xl md:text-5xl font-bold tracking-wide text-white font-display">
          Movie<span class="text-emerald-400">Tracker</span>
        </h1>

        <p class="mt-4 text-sm md:text-base text-slate-200 max-w-md mx-auto md:mx-0">
          Encontre, salve e acompanhe seus filmes favoritos em um só lugar. Faça login ou se
          cadastre!
        </p>
      </div>

      <!-- Lado direito: card de login -->
      <div
        class="w-full max-w-md bg-[#12142a]/70 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10"
      >
        <h2 class="text-xl text-white font-semibold mb-6">Entrar</h2>

        <form class="space-y-4">
          <input
            type="email"
            placeholder="Email"
            class="w-full px-4 py-3 rounded-md bg-[#0d0f24] text-white border border-white/10 focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            class="w-full px-4 py-3 rounded-md bg-[#0d0f24] text-white border border-white/10 focus:ring-2 focus:ring-green-400 outline-none"
          />

          <!-- botão novo -->
          <router-link
            to="/home"
            class="block w-full mt-2 py-3 text-center bg-emerald-500 hover:bg-emerald-600 transition text-black font-semibold rounded-md shadow-lg hover:shadow-emerald-500/20"
          >
            Entrar
          </router-link>
        </form>

        <div class="text-right mt-4">
          <button class="text-sm text-gray-300 hover:text-white transition">
            Esqueci minha senha
          </button>
        </div>

        <div class="text-center mt-6 text-gray-300">
          Não tem conta?
          <router-link to="/register" class="text-green-400 hover:underline ml-1">
            Criar conta
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
