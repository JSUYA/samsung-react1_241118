import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// type ResponseValue = Todo[] // 할 일 목록

export interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일mutate
}

// interface ResponseValue {
//   id: string
//   order: number
//   title: string
//   done: boolean
//   createdAt: string
//   updatedAt: string
// }

type FilterStatus = 'all' | 'todo' | 'done'

export const useTodoFilterStore = create(
  immer(
    combine(
      {
        filterStatus: <FilterStatus>'all'
      },
      set => ({
        setTodoFilterStatus(filter: FilterStatus) {
          set(state => {
            state.filterStatus = filter
          })
        }
      })
    )
  )
)

export function useFetchTodos() {
  const filterStatus = useTodoFilterStore(state => state.filterStatus)

  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch('/api/todos', {
        method: 'GET'
      })
      return await res.json()
    },
    staleTime: 1000 * 60 * 5,
    select: todos => {
      return todos.filter(todo => {
        switch (filterStatus) {
          case 'all':
            return true
          case 'todo':
            return !todo.done
          case 'done':
            return todo.done
        }
      })
    }
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    //서버로 보낼때 (변화?를 줄때)
    mutationFn: async (title: string) => {
      const res = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            title
          }
        })
      })
      return await res.json()
    },
    /*try-catch 구문과 비슷*/
    //Motation이 호출된 시점
    onMutate: async (title: string) => {
      const newTodo = {
        id: Date.now().toString(),
        title,
        done: false,
        createdAt: '',
        updatedAt: '',
        order: 0
      }
      // 낙관적 업데이트 전에 사용자 목록 쿼리를 취소해 잠재적인 충돌 방지!
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      // 캐시된 데이터(사용자 목록) 가져오기!
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      if (previousTodos) {
        queryClient.setQueryData(['todos'], [newTodo, ...previousTodos])
      }
      // 각 콜백의 context로 전달할 데이터 반환!
      return previousTodos
    },
    //Mutation이 보내지고 성공 결과가 돌아왔을때
    onSuccess: (data: Todo) => {
      const todos = queryClient.getQueryData<Todo[]>(['todos'])
      if (todos) {
        todos.splice(0, 1, data)
      }
      // 아~ 귀찮아, 그냥 새로 가져오자!
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    //Mutation이 보내지고 에러 결과가 돌아왔을때
    onError: () => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      return previousTodos
    },
    //Mutation이 보내지고 성공 실패 여부 관계 없이(항상 마지막에 실행됨)
    onSettled: () => {}
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => {
      const res = await fetch('/api/todos', {
        body: JSON.stringify({
          endpoint: todo.id,
          method: 'PUT',
          data: todo
        })
      })
      return await res.json()
    },
    onMutate: () => {},
    //Mutation이 보내지고 성공 결과가 돌아왔을때
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos']
      })
    },
    //Mutation이 보내지고 에러 결과가 돌아왔을때
    onError: () => {},
    //Mutation이 보내지고 성공 실패 여부 관계 없이(항상 마지막에 실행됨)
    onSettled: () => {}
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => {
      await fetch('/api/todos', {
        body: JSON.stringify({
          endpoint: todo.id,
          method: 'DELETE'
        })
      })
    },
    onMutate: () => {},
    //Mutation이 보내지고 성공 결과가 돌아왔을때
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos']
      })
    },
    //Mutation이 보내지고 에러 결과가 돌아왔을때
    onError: () => {},
    //Mutation이 보내지고 성공 실패 여부 관계 없이(항상 마지막에 실행됨)
    onSettled: () => {}
  })
}
