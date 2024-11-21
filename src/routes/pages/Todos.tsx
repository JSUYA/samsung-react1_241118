import { useFetchTodos, useCreateTodo } from '@/hook/todo'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Loader from '@/components/Loader'

export default function TodosPage() {
  const [title, setTitle] = useState('')
  const { data: todos, isLoading } = useFetchTodos()
  const { mutate } = useCreateTodo()

  function createTodo(event?: React.KeyboardEvent<HTMLInputElement>) {
    if (event?.nativeEvent.isComposing) return
    mutate(title)
  }

  return (
    <>
      <h1>Todos!</h1>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && createTodo(e)}
      />
      <button
        onClick={() => {
          createTodo()
        }}>
        추가
      </button>

      {isLoading ? (
        <Loader />
      ) : (
        <ul>
          {todos &&
            todos.map(todo => {
              return (
                <>
                  <li key={todo.id}>
                    <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
                  </li>
                </>
              )
            })}
        </ul>
      )}
      <Outlet />
    </>
  )
}
