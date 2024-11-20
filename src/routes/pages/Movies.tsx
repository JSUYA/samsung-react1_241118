import { Outlet } from 'react-router-dom'
import SearchBar from '@/components/movies/SearchBar'
import MovieList from '@/components/movies/MovieList'

export default function Movies() {
  return (
    <>
      <h1>Movies Page</h1>
      <h2>검색창에 영문으로 영화이름을 검색</h2>
      <SearchBar />
      <MovieList />
      <Outlet />
    </>
  )
}
