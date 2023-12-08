import { TodoCreate, TodoReturn } from "../interfaces/todo.interface";
import {prisma} from '../app'

export const createTodoService = async (data: TodoCreate, user_id: string): Promise<TodoReturn> => {
  const todo = await prisma.todo.create({
    data: {
      title: data.title,
      content: data.content,
      user_id
    }
  })

  return todo
}