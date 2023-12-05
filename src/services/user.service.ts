import { hashSync } from "bcryptjs";
import { prisma } from "../app";
import { User, UserCreate, UserReturn, UserUpdate, UserUpdatePassword } from "../interfaces/user.interface";
import { returnUserSchema } from "../schemas/user.schemas";
import { AppError } from "../errors/AppError.errors";
import {v4} from 'uuid'

export const createUserService = async (data: UserCreate): Promise<UserReturn> => {
  const hashPassword = hashSync(data.password, 10)
  const user: User = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashPassword,
      avatar: data.avatar
    }
  })

  return returnUserSchema.parse(user)
}

export const readUserProfileService = async (email: string): Promise<UserReturn> => {
  const user: User | null = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if(!user) throw new AppError('User not found, please verify your token', 404)

  return returnUserSchema.parse(user)
}

export const updateUserService = async (data: UserUpdate, id: string): Promise<UserReturn> => {
  const user: User = await prisma.user.update({
    where: {
      id
    },
    data
  })

  return returnUserSchema.parse(user)
}

export const updateUserPasswordService = async (data: UserUpdatePassword, id: string): Promise<{message: string}> => {
  const user: User | null = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if(!user) throw new AppError('User not found, please verify your token', 404)

  if(user.password_recovery !== data.password_recovery) throw new AppError('Invalid password recovery token', 401)

  await prisma.user.update({
    where: {
      id
    },
    data: {
      password: hashSync(data.password, 10),
      password_recovery: v4()
    }
  })

  return {message: 'Password updated'}
}

export const deleteUserService = async (id: string): Promise<void> => {
  await prisma.user.update({
    where: {
      id
    },
    data: {
      active: false
    }
  }) 
}