import {z} from 'zod'

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  status: z.string(),
  user_id: z.string()
})

export const createTodoSchema = todoSchema.omit({
  id: true,
  status: true,
  user_id: true
})

export const returnTodoSchema = todoSchema.array()

export const updateTodoSchema = createTodoSchema.pick({
  title: true,
  content: true
}).partial()
