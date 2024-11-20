import { useQuery } from '@tanstack/react-query'
import { useMovieStore } from '@/stores/movie'
import { useState } from 'react'

interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export function useMovies() {
  const searchText = useMovieStore(state => state.searchText)

  return useQuery<Movie[]>({
    queryKey: ['movies', searchText],
    enabled: false,
    queryFn: async () => {
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
      )
      const { Search, Error } = await res.json()
      console.log(Error)
      return Search
    }
  })
}
