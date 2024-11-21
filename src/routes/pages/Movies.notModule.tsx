import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function MoviesPage() {
  const [text, setText] = useState('')
  const [searchText, setSearchText] = useState('')
  const queryClient = useQueryClient()

  const { data: movies } = useQuery<Movie[]>({
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
    staleTime: 1000 * 60 * 5
  })

  function fetchMovies() {
    setSearchText(text)
    queueMicrotask(() => {
      queryClient.fetchQuery({
        queryKey: ['movies', searchText],
        staleTime: 1000 * 60 * 5
      })
    })
  }

  return (
    <>
      <h1>Movies Page!</h1>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && fetchMovies()}></input>
      <button
        onClick={() => {
          fetchMovies()
        }}>
        검색
      </button>
      <ul>
        {movies &&
          movies.map(movie => (
            <li key={movie.imdbID}>
              <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
            </li>
          ))}
      </ul>
    </>
  )
}

// export default function Movies() {
//   return (
//     <>
//       <h1>Movies Page</h1>
//       <h2>검색창에 영문으로 영화이름을 검색</h2>
//       <SearchBar />
//       <MovieList />
//       <Outlet />
//     </>
//   )
// }
