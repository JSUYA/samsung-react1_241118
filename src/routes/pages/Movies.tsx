import { Outlet } from 'react-router-dom'
import SearchBar from '@/components/movies/SearchBar'
import { useMovieStore } from '@/stores/movie'
import MovieList from '@/components/movies/MovieList'

export default function Movies() {
  // const searchText = useMovieStore(state => state.searchText)
  console.log('called Movies')
  return (
    <>
      <h1>Movies Page</h1>
      <h2>검색창에 영문으로 영화이름을 검색</h2>
      <SearchBar />
      {/* {searchText ? <MovieList /> : <></>} */}
      <MovieList />
      <Outlet />
    </>
  )
}
