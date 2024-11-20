import { useCountStore } from '@/stores/count'
import { useUserStore } from '@/stores/user'

export default function Home() {
  const count = useCountStore(state => state.count)
  const double = useCountStore(state => state.double)
  const increase = useCountStore(state => state.increase)
  const decrease = useCountStore(state => state.decrease)

  const user = useUserStore(state => state.user)
  const setUserAge = useUserStore(state => state.setUserAge)
  const setUserEmail = useUserStore(state => state.setUserEmail)

  return (
    <>
      <h1>Home</h1>
      <button onClick={() => increase()}>increase</button>
      <button onClick={() => decrease()}>decrease</button>
      <h2>{count}</h2>
      <h2>{double}</h2>
      <hr />
      <button onClick={() => setUserAge(30)}>버튼</button>
      <button onClick={() => setUserEmail('thesecon@gmail.com')}>버튼2</button>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>Junsu TEST</p>
    </>
  )
}
