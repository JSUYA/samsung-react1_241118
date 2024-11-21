import { create } from 'zustand'
import { combine } from 'zustand/middleware'

interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

interface MovieDetails {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: MovieRating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export interface MovieRating {
  Source: string
  Value: string
}

export const useMovieStore = create(
  combine(
    {
      inputText: '',
      searchText: '',
      movies: [] as Movie[],
      currentMovie: null as null | MovieDetails,
      isLoading: false
    },
    (set, get) => {
      return {
        setSearchText: (text: string) => {
          set({
            searchText: text
          })
        },
        setInputText: (text: string) => {
          set({
            inputText: text
          })
        },
        fetchMovieDetails: async (movieId: string) => {
          set({
            isLoading: true
          })
          const res = await fetch(
            `https://omdbapi.com/?apikey=7035c60c&i=${movieId}`
          )
          const data = await res.json()
          set({
            currentMovie: data,
            isLoading: false
          })
        }
      }
    }
  )
  // searchText: string
  // movies: Movie[]
  // currentMovie: MovieDetails | null
  // isLoading: boolean
  // setSearchText: (text: string) => void
  // fetchMovies: () => Promise<void>
  // fetchMovieDetails: (movieId: string) => Promise<void>
)
