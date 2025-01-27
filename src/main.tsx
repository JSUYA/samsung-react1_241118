import { createRoot } from 'react-dom/client'
import './main.css'
import Router from '@/routes/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//   import DelayedData from '~/components/DelayedData'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </>
)
