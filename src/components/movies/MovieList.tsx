import { useMovieStore } from '@/stores/movie'
import { Link } from 'react-router-dom'

export default function MovieList() {
  const movies = useMovieStore(state => state.movies)

  return (
    <>
      <ul>
        {movies.map(movie => (
          <li key={movie.imdbID}>
            <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
