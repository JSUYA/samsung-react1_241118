import { useMovieStore } from '@/stores/movie'

import { useQueryClient } from '@tanstack/react-query'

export default function SearchBar() {
  const inputText = useMovieStore(state => state.inputText)
  const searchText = useMovieStore(state => state.searchText)
  const setSearchText = useMovieStore(state => state.setSearchText)
  const setInputText = useMovieStore(state => state.setInputText)

  console.log('called SearchBar')

  function fetchMovies() {
    console.log('called fetchMovies')
    console.log(`call setSearchText ${inputText}`)
    setSearchText(inputText)
    console.log(
      `call queueMicrotask inputText : ${inputText} SearchText: ${searchText}`
    )
    queueMicrotask(() => {
      console.log(
        `called queueMicrotask and call fetchQuery(getMoviesQueryOption) ${searchText}`
      )
      // queryClient.fetchQuery(getMoviesQueryOption(searchText))
    })
  }

  return (
    <>
      <input
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && fetchMovies()}
      />
      <button
        onClick={() => {
          fetchMovies()
        }}>
        검색
      </button>
    </>
  )
}
