import { useParams, useNavigate } from 'react-router-dom'
import Modal from '@/components/Modal'
import { useFetchTodos, useUpdateTodo, type Todo } from '@/hook/todo'
import { useState, useEffect } from 'react'

export default function Todo() {
  const [title, setTitle] = useState('')
  const { todoId } = useParams()
  const { data: todos } = useFetchTodos()
  const navigate = useNavigate()
  const { mutateAsync, error } = useUpdateTodo()

  let todo: Todo | undefined
  todo = todos?.find(todo => todo.id === todoId)
  useEffect(() => {
    setTitle(todo?.title || '')
  }, [todo, todoId])

  async function save() {
    if (!todo) return
    const _title = title.trim()
    if (!_title) return
    if (todo.title === title) return
    await mutateAsync({
      ...todo,
      title
    })

    if (error) {
      alert(error.message)
      return
    }

    cancel()
  }

  function cancel() {
    navigate(-1)
  }

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
            <div>
              <button onClick={() => save()}>저장</button>
              <button onClick={() => cancel()}>취소</button>
            </div>

            <div>{todo.createdAt}</div>
            <div>{todo.updatedAt}</div>
          </>
        )}
      </>
    </Modal>
  )
}

//https://nextjs-movie-app-steel.vercel.app/movies/tt11315808
