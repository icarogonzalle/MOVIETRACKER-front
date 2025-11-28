import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/movietracker',
})

export async function getPopularMovies() {
  const { data } = await api.get('/movies/popular')
  return data
}

export async function getRecommendedMovies() {
  const { data } = await api.get('/movies/recommended')
  return data
}

export async function getFavoriteMovies() {
  const { data } = await api.get('/users/1/favorites') // exemplo, depois usa user logado
  return data
}

export async function searchMovie(title: string) {
  const { data } = await api.get('/movies/fetch', {
    params: { title },
  })
  return data
}
