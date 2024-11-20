import { useQuery } from '@tanstack/react-query'

export function DelayedData({ time }: { time: number }) {
  const { data } = useQuery<{
    message: string
    time: string
  }>({
    queryKey: ['delay', time],
    queryFn: async () => {
      const res = await fetch(`https://api.heropy.dev/v0/delay?t=${time}`)
      return await res.json()
    },
    staleTime: 1000 * 3,
    refetchInterval: 1000,
    initialData: {
      message: 'hello',
      time: new Date().toISOString()
    },
    placeholderData: {
      message: 'placeholderData',
      time: new Date().toISOString()
    }
  })
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
