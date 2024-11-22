import { useParams, useNavigate } from 'react-router-dom'
import Modal from '@/components/Modal'
import {
  useFetchTodos,
  useUpdateTodo,
  useDeleteTodo,
  type Todo
} from '@/hook/todo'
import { useState, useEffect } from 'react'

export default function Todo() {
  const [title, setTitle] = useState('')
  const [done, setDone] = useState(false)
  const { todoId } = useParams()
  const { data: todos } = useFetchTodos()
  const navigate = useNavigate()
  const { mutateAsync, error } = useUpdateTodo()
  const { mutateAsync: mutateRemoveAsync, error: removeError } = useDeleteTodo()

  let todo: Todo | undefined
  todo = todos?.find(todo => todo.id === todoId)
  useEffect(() => {
    setTitle(todo?.title || '')
    setDone(todo?.done || false)
  }, [todo, todoId])

  async function updateTodo() {
    if (!todo) return
    const _title = title.trim()
    if (!_title) return
    // if (todo.title === title) return
    await mutateAsync({
      ...todo,
      title: _title,
      done
    })

    if (error) {
      alert(error.message)
      return
    }

    cancelTodo()
  }

  function cancelTodo() {
    navigate(-1)
  }

  async function removeTodo() {
    if (!todo) return
    await mutateRemoveAsync({
      ...todo,
      title
    })

    if (removeError) {
      alert(removeError.message)
      return
    }

    cancelTodo()
  }

  return (
    <Modal>
      <h1> Todo Page</h1>
      <>
        {todo && (
          <>
            <div>
              {/* {JSON.stringify(todo.done)} */}
              <input
                type="checkbox"
                checked={done}
                onChange={e => setDone(e.target.checked)}
              />
            </div>

            <div>
              <textarea
                style={{ width: `100%`, padding: 10, boxSizing: 'border-box' }}
                value={title}
                rows={4}
                onChange={e => setTitle(e.target.value)}></textarea>
            </div>
            <div>
              <button onClick={() => updateTodo()}>저장</button>
              <button onClick={() => cancelTodo()}>취소</button>
              <button onClick={() => removeTodo()}>삭제</button>
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
