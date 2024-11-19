import { redirect } from 'react-router-dom'

export async function requiresAuth({ request }: { request: Request }) {
  const token = localStorage.getItem('token')
  const url = new URL(request.url)
  const callbackUrl = url.pathname + url.search
  if (token) {
    // const res = await fetch('https://api.test.dev/v0/me', {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    // const user = await res.json()
    // if (user) {
    //   //통과
    //   return user
    // }
    //거절

    return {
      name: 'name',
      age: 36
    }
  }
  return redirect(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`)
}
