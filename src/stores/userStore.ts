import { defineStore } from 'pinia'
import type { UserDTO } from '@/services/userService'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null as UserDTO | null,
    token: null as string | null, // se você usar JWT depois
  }),

  getters: {
    isLoggedIn(state) {
      return !!state.currentUser
    },
    userId(state) {
      return state.currentUser?.id ?? null
    },
  },

  actions: {
    setUser(user: UserDTO) {
      this.currentUser = user
    },

    logout() {
      this.currentUser = null
      this.token = null
    },
  },
})
