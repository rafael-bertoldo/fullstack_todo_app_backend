import { Todo, TodoArrayReturn, TodoCreate, TodoReturn, TodoUpdate } from "../interfaces/todo.interface";
import {prisma} from '../app'
import { AppError } from "../errors/AppError.errors";

export const createTodoService = async (data: TodoCreate, user_id: string): Promise<TodoReturn> => {
  const todo: Todo = await prisma.todo.create({
    data: {
      title: data.title,
      content: data.content,
      user_id
    }
  })

  return todo
}

export const readTodoService = async (user_id: string): Promise<TodoArrayReturn> => {
  const todos: TodoArrayReturn = await prisma.todo.findMany({
    where: {
      user_id
    }
  })

  return todos
}

export const readOneTodoService = async (user_id: string, todo_id: string): Promise<TodoReturn> => {
  const todo: TodoReturn | null = await prisma.todo.findFirst({
    where: {
      id: todo_id,
      user_id
    }
  })

  if(!todo) throw new AppError('Todo not found', 404)

  return todo
}

export const updateTodoService = async (data: TodoUpdate, user_id: string, todo_id: string): Promise<TodoReturn> => {
  const todo: TodoReturn = await prisma.todo.update({
    where: {
      id: todo_id,
      user_id
    },
    data
  })

  return todo
}