import { useMovieStore } from '@/stores/movie'
import { useMovies } from '@/hook/movie'

export default function SearchBar() {
  const searchText = useMovieStore(state => state.searchText)
  const setSearchText = useMovieStore(state => state.setSearchText)
  // const fetchMovies = useMovieStore(state => state.fetchMovies)
  const { refetch } = useMovies()

  return (
    <>
      <input
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && refetch()}
      />
      <button
        onClick={() => {
          useMovies()
        }}>
        검색
      </button>
    </>
  )
}
