import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Modal from '@/components/Modal'

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

export default function MovieDetailsPage() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState<MovieDetails | null>(null)

  useEffect(() => {
    fetchMovieDetails()
  }, [movieId])

  async function fetchMovieDetails() {
    const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${movieId}`)
    const data = await res.json()
    setMovie(data)
  }

  return (
    <Modal>
      <h1> Movie Details Page</h1>
      {movie && (
        <>
          <h2>{movie.Title}</h2>
          <img
            src={movie.Poster}
            alt={movie.Title}
          />
          <p>{movie.Director}</p>
          <p>{movie.Plot}</p>
          <p>{movie.Actors}</p>
        </>
      )}
    </Modal>
  )
}

//https://nextjs-movie-app-steel.vercel.app/movies/tt11315808
