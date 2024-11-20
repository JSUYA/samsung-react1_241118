import { create } from 'zustand'
import {
  combine,
  subscribeWithSelector,
  persist,
  createJSONStorage
} from 'zustand/middleware'

export const useCountStore = create(
  persist(
    subscribeWithSelector(
      combine(
        {
          count: 0,
          double: 0
        },
        set => {
          function increase() {
            set(state => ({
              count: state.count + 1
            }))
          }
          function decrease() {
            set(state => ({
              count: state.count - 1
            }))
          }

          function increaseDouble() {
            set(state => ({
              double: state.count * 2
            }))
          }
          return { increase, decrease, increaseDouble }
        }
      )
    ),
    { name: 'countStore', storage: createJSONStorage(() => sessionStorage) }
  )
)

// useCountStore.subscribe(선택자, 콜백)
useCountStore.subscribe(
  state => state.count,
  count => {
    // double = count * 2
    useCountStore.setState({
      double: count * 2
    })
  }
)
