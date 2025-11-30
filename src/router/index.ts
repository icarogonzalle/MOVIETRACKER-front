import { createRouter, createWebHistory } from 'vue-router'

// Layout
import MainLayout from '@/layouts/MainLayout.vue'

// Views sem layout (SEM NAVBAR)
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

// Views com layout (COM NAVBAR)
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import MovieView from '@/views/MovieView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Sem navbar
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },

    // Redireciona / -> /login
    {
      path: '/',
      redirect: '/login',
    },

    // Com navbar (MainLayout)
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
        },
        {
          path: 'movies', // URL: /movie
          name: 'movies',
          component: MovieView,
        },
      ],
    },
  ],
})

export default router
