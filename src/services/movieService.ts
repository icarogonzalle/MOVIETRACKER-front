// src/services/movieService.ts
import axios from 'axios'

export interface MovieDTO {
  id: number
  title: string
  year: number | null
  genre: string | null
  poster: string | null
  omdbId: string | null
  imdbRating: string | null
  directorName: string | null
  actors: string[]
}

const api = axios.create({
  baseURL: 'http://localhost:8080/api/movietracker',
})

export async function getAllMovies(q?: string): Promise<MovieDTO[]> {
  const { data } = await api.get<MovieDTO[]>('/movies', {
    params: q ? { q } : undefined,
  })
  return data
}

export async function getMovieById(id: number): Promise<MovieDTO> {
  const { data } = await api.get<MovieDTO>(`/movies/${id}`)
  return data
}

export async function findOrFetchMovie(title: string): Promise<MovieDTO> {
  const { data } = await api.get<MovieDTO>('/movies/fetch', {
    params: { title },
  })
  return data
}

export async function searchMovies(query: string): Promise<MovieDTO[]> {
  const { data } = await api.get<MovieDTO[]>('/movies', {
    params: { q: query },
  })
  return data
}

export async function getFavoriteMovies(userId: number): Promise<MovieDTO[]> {
  const { data } = await api.get<MovieDTO[]>(`/users/${userId}/favorites`)
  return data
}
