import { useFetchTodos, useCreateTodo, useTodoFilterStore } from '@/hook/todo'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Loader from '@/components/Loader'

export default function TodosPage() {
  const [title, setTitle] = useState('')
  const { data: todos, isLoading } = useFetchTodos()
  const { mutate } = useCreateTodo()
  const setTodoFilterStatus = useTodoFilterStore(
    state => state.setTodoFilterStatus
  )

  function createTodo(event?: React.KeyboardEvent<HTMLInputElement>) {
    if (event?.nativeEvent.isComposing) return
    mutate(title)
  }

  return (
    <>
      <h1>Todos!</h1>

      <div>
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
      </div>
      <div>
        <button
          onClick={() => {
            setTodoFilterStatus('all')
          }}>
          전체
        </button>
        <button
          onClick={() => {
            setTodoFilterStatus('todo')
          }}>
          할 일
        </button>
        <button
          onClick={() => {
            setTodoFilterStatus('done')
          }}>
          왼료
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <ul>
          {todos &&
            todos.map(todo => {
              return (
                <>
                  <li key={todo.id}>
                    <input
                      type="checkbox"
                      checked={todo.done}
                      disabled={true}
                    />
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
