import { hashSync } from "bcryptjs";
import { prisma } from "../app";
import { User, UserCreate, UserReturn, UserUpdate } from "../interfaces/user.interface";
import { returnUserSchema } from "../schemas/user.schemas";
import { AppError } from "../errors/AppError.errors";

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
  console.log('oi')
  const user: User = await prisma.user.update({
    where: {
      id
    },
    data
  })

  return returnUserSchema.parse(user)
}