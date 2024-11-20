import { DelayedData } from '@/components/DelayedData'

export default function DelayPage() {
  // const { data } = useQuery({
  //   queryKey: ['delay'],
  //   queryFn: async () => {
  //     const res = await fetch('https://api.heropy.dev/v0/delay?t=2000')
  //     return await res.json()
  //   }
  // })
  return (
    <>
      <h1>DelayPage</h1>
      <DelayedData time={0} />
      <DelayedData time={1000} />
      <DelayedData time={2000} />
      <DelayedData time={3000} />
      <DelayedData time={4000} />
    </>
  )
}
