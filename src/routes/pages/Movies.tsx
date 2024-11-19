import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  const [searchText, setSearchText] = useState('')
  const [movies, setMovies] = useState<Movie[]>([]) // never [] 타입이 됨

  //반응형 데이터 -> 데이터가 바뀌면 화면도 바뀐다.
  async function fetchMovies() {
    const res = await fetch(
      `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
    )
    const { Search, Error } = await res.json()
    if (!Error) {
      setMovies(Search)
    }
  }
  return (
    <>
      <h1>Movies Page</h1>
      <input
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && fetchMovies()}
      />
      <button onClick={fetchMovies}>검색</button>
      <ul>
        {movies.map(movie => (
          <li key={movie.imdbID}>
            <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  )
}
