import { Outlet } from 'react-router-dom'
import SearchBar from '@/components/movies/SearchBar'
import MovieList from '@/components/movies/MovieList'

export default function Movies() {
  return (
    <>
      <h1>Movies Page</h1>
      <SearchBar />
      <MovieList />
      <Outlet />
    </>
  )
}
