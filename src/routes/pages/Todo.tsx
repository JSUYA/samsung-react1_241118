import { useParams } from 'react-router-dom'
import Modal from '@/components/Modal'
import { useFetchTodos, type Todo } from '@/hook/todo'
import { useState, useEffect } from 'react'

export default function Todo() {
  const [title, setTitle] = useState('')
  const { todoId } = useParams()
  const { data: todos } = useFetchTodos()
  // const { mutate } = useUpdateTodo()

  let todo: Todo | undefined
  todo = todos?.find(todo => todo.id === todoId)
  useEffect(() => {
    setTitle(todo?.title || '')
  }, [todo, todoId])

  function onChangeTitle() {}

  return (
    <Modal>
      <h1> Todo Page</h1>
      <>
        {todo && (
          <>
            <div>{JSON.stringify(todo.done)}</div>

            <div>
              <textarea
                style={{ width: `100%`, padding: 10, boxSizing: 'border-box' }}
                value={title}
                rows={4}
                onChange={e => setTitle(e.target.value)}></textarea>
            </div>
            <button
              onClick={() => {
                onChangeTitle
              }}>
              저장버튼
            </button>
            <div>{todo.createdAt}</div>
            <div>{todo.updatedAt}</div>
          </>
        )}
      </>
    </Modal>
  )
}

//https://nextjs-movie-app-steel.vercel.app/movies/tt11315808
