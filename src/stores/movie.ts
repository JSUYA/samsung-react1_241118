import { create } from 'zustand'

export const useMovieStore = create(() => {
  return {
    searchText: '',
    movies: [],
    setSearchText: () => {}
  }
})
