import { useMovieStore } from '@/stores/movie'
import { Link } from 'react-router-dom'
import { useMovies } from '@/hook/movie'

export default function MovieList() {
  // const movies = useMovieStore(state => state.movies)
  const { data: movies } = useMovies()

  return (
    <>
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
