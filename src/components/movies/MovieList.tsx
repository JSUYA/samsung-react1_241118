import { Link } from 'react-router-dom'
import { useMovies } from '@/hook/movie'
import Loader from '@/components/Loader'

export default function MovieList() {
  console.log('called MovieList')
  const { data: movies, dataUpdatedAt, isFetching } = useMovies()

  return (
    <>
      <p>Data updated at : {new Date(dataUpdatedAt).toLocaleString()}</p>
      {isFetching ? (
        <Loader />
      ) : (
        <ul>
          {movies &&
            movies.map(movie => (
              <li key={movie.imdbID}>
                <Link to={`/movies/${movie.imdbID}`}>
                  {movie.Title}({movie.Year})
                </Link>
              </li>
            ))}
        </ul>
      )}
    </>
  )
}
