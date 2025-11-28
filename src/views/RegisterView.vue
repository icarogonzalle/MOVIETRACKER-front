<!-- src/views/RegisterView.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import type { AxiosError } from 'axios'

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const handleSubmit = async () => {
  loading.value = true
  error.value = null
  success.value = false

  try {
    const response = await axios.post('http://localhost:8080/api/movietracker/users/register', {
      name: name.value,
      email: email.value,
      password: password.value, // se não usar no backend, remove
    })

    console.log('Usuário registrado:', response.data)
    success.value = true

    name.value = ''
    email.value = ''
    password.value = ''
  } catch (err: unknown) {
    const axiosErr = err as AxiosError<{ message?: string }>
    error.value = axiosErr.response?.data?.message || 'Erro ao registrar usuário.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1b254b] to-[#0d0f24]"
  >
    <div
      class="w-full max-w-md bg-[#12142a]/70 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10"
    >
      <h2 class="text-xl text-white font-semibold mb-6">Criar conta</h2>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <input
          v-model="name"
          type="text"
          placeholder="Nome"
          class="w-full px-4 py-3 rounded-md bg-[#0d0f24] text-white border border-white/10 focus:ring-2 focus:ring-green-400 outline-none"
        />

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-3 rounded-md bg-[#0d0f24] text-white border border-white/10 focus:ring-2 focus:ring-green-400 outline-none"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Senha"
          class="w-full px-4 py-3 rounded-md bg-[#0d0f24] text-white border border-white/10 focus:ring-2 focus:ring-green-400 outline-none"
        />

        <button
          type="submit"
          :disabled="loading"
          class="w-full mt-2 py-3 bg-green-500 hover:bg-green-600 disabled:opacity-60 transition text-black font-semibold rounded-md"
        >
          {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
        </button>
      </form>

      <p v-if="error" class="mt-4 text-red-400 text-sm">
        {{ error }}
      </p>

      <p v-if="success" class="mt-4 text-green-400 text-sm">Usuário cadastrado com sucesso!</p>
    </div>
  </div>
</template>
