import { hashSync } from "bcryptjs";
import { prisma } from "../app";
import { User, UserCreate, UserReturn } from "../interfaces/user.interface";
import { returnUserSchema } from "../schemas/user.schemas";

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