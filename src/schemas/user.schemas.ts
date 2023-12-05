import {z} from 'zod'

export const userSchema = z.object({
  id: z.string(),
  username: z.string().max(120).min(3),
  email: z.string().max(255).email('Please insert a valid email format'),
  password: z.string(),
  password_recovery: z.string(),
  avatar: z.string(),
  created_at: z.date()
})

export const createUserSchema = userSchema.omit({
  id: true,
  password_recovery: true,
  created_at: true
})
export const returnUserSchema = userSchema.omit({
  password: true,
  password_recovery: true
})
export const updateUserSchema = createUserSchema.partial()