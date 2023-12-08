import {z} from 'zod'
import { createTodoSchema, returnTodoSchema, updateTodoSchema, todoSchema } from '../schemas/todo.schemas'

export type Todo = z.infer<typeof todoSchema>
export type TodoCreate = z.infer<typeof createTodoSchema>
export type TodoReturn = z.infer<typeof todoSchema>
export type TodoArrayReturn = z.infer<typeof returnTodoSchema>
export type TodoUpdate = z.infer<typeof updateTodoSchema>