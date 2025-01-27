import { createHashRouter, RouterProvider } from 'react-router-dom'
import DefaultLayout from './layouts/Default'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import About from './pages/About'
import Notfound from './pages/Notfound'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import Delay from './pages/Delay'
import Todos from './pages/Todos'
import Todo from './pages/Todo'
import { requiresAuth } from './loaders/requiresAuth'

const router = createHashRouter([
  //각각의 페이지 들이 들어감
  //라우트 객체(각 페이지 정보)
  {
    //중첩 라우트
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/movies',
        element: <Movies />,
        children: [
          {
            path: '/movies/:movieId',
            element: <MovieDetails />
          }
        ]
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        loader: requiresAuth
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/delay',
        element: <Delay />
      },
      {
        path: '/todos',
        element: <Todos />,
        children: [
          {
            path: '/todos/:todoId',
            element: <Todo />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Notfound />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
