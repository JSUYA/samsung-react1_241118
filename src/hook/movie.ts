import { useQuery, queryOptions } from '@tanstack/react-query'
import { useMovieStore } from '@/stores/movie'

interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
export function getMoviesQueryOption(searchText: string) {
  console.log(`called getMoviesQueryOption ${searchText}`)
  return queryOptions<Movie[]>({
    queryKey: ['movies', searchText],
    enabled: !!searchText,
    queryFn: async () => {
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
      )
      const { Search, Error } = await res.json()
      console.log(Error)
      return Search
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData => {
      console.log(`in placeholderData searchText ${searchText}`)
      return keepPreviousData
    },
    select: movies => {
      return movies.filter(movie => {
        return Number.parseInt(movie.Year, 10) > 2000
      })
    }
  })
}

export function useMovies() {
  const searchText = useMovieStore(state => state.searchText)
  console.log(`called useMovies ${searchText}`)
  return useQuery(getMoviesQueryOption(searchText))
}
