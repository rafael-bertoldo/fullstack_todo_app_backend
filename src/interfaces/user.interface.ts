import {z} from 'zod'
import { createUserSchema, returnUserSchema, updateUserSchema, userSchema } from '../schemas/user.schemas'

export type User = z.infer<typeof userSchema>
export type UserCreate = z.infer<typeof createUserSchema>
export type UserReturn = z.infer<typeof returnUserSchema>
export type UserUpdate = z.infer<typeof updateUserSchema>