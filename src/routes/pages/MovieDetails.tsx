import { useParams } from 'react-router-dom'
import { useMovieStore } from '@/stores/movie'
import { useEffect } from 'react'
import Modal from '@/components/Modal'

export default function MovieDetailsPage() {
  const { movieId } = useParams()
  const currentMovie = useMovieStore(state => state.currentMovie)
  const isLoading = useMovieStore(state => state.isLoading)
  const fetchMovieDetails = useMovieStore(state => state.fetchMovieDetails)

  useEffect(() => {
    if (!movieId) return
    fetchMovieDetails(movieId)
  }, [movieId])

  return (
    <Modal loading={isLoading}>
      <h1> Movie Details Page</h1>
      <>
        {currentMovie && (
          <>
            <h2>{currentMovie.Title}</h2>
            <img
              src={currentMovie.Poster}
              alt={currentMovie.Title}
            />
            <p>{currentMovie.Director}</p>
            <p>{currentMovie.Plot}</p>
            <p>{currentMovie.Actors}</p>
          </>
        )}
      </>
    </Modal>
  )
}

//https://nextjs-movie-app-steel.vercel.app/movies/tt11315808
