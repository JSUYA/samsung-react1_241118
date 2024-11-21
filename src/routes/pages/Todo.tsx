import { useParams } from 'react-router-dom'
import { useMovieStore } from '@/stores/movie'
import { useEffect } from 'react'
import Modal from '@/components/Modal'
import { useFetchTodos } from '@/hook/todo'

export default function Todo() {
  const { todoId } = useParams()
  const { data: todos } = useFetchTodos()
  const todo = todos?.find(todo => todo.id === todoId)

  return (
    <Modal>
      <h1> Todo Page</h1>
      <>
        {todo && (
          <>
            <div>{JSON.stringify(todo.done)}</div>
            <div>{todo.title}</div>
            <div>{todo.createdAt}</div>
            <div>{todo.updatedAt}</div>
          </>
        )}
      </>
    </Modal>
  )
}

//https://nextjs-movie-app-steel.vercel.app/movies/tt11315808
