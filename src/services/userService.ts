// src/services/userService.ts
import axios from 'axios'
import type { MovieDTO } from './movieService'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/movietracker',
})

export interface UserDTO {
  id: number
  name: string
  email: string
  favoriteMovies: MovieDTO[]
  favoriteActors: string[]
  favoriteDirectors: string[]
}

export interface FavoriteToggleDTO {
  userId: number
  movieId: number
}

/**
 * Toggle de favoritos (add/remove)
 * Retorna o UserDTO completo vindo do backend
 */
export async function toggleFavoriteMovie(userId: number, movieId: number): Promise<UserDTO> {
  const { data } = await api.post<UserDTO>('/users/favorites/movies/toggle', {
    userId,
    movieId,
  } satisfies FavoriteToggleDTO)

  return data
}

/**
 * Lista completa de favoritos do usuário
 * (caso queira usar depois)
 */
export async function getFavoriteMovies(userId: number): Promise<MovieDTO[]> {
  const { data } = await api.get<MovieDTO[]>(`/users/${userId}/favorites`)
  return data
}
