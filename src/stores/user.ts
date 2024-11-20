import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useUserStore = create(
  immer(
    combine(
      {
        user: {
          name: 'Neo',
          age: 22,
          isValid: true,
          address: {
            emails: ['neo1@gmail.com', 'neo2@gmail.com']
          }
        }
      },
      set => ({
        setUserAge(age: number) {
          set(state => {
            state.user.age = age
          })
        },
        setUserEmail(email: string) {
          set(state => {
            state.user.address.emails[0] = email
          })
        }
      })
    )
  )
)
