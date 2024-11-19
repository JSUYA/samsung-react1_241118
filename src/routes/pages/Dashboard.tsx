import { useLoaderData } from 'react-router-dom'

export default function DashboardPage() {
  const user = useLoaderData()
  return (
    <>
      <h1>Dashboard Page</h1>
      <p>{JSON.stringify(user)}</p>
    </>
  )
}
