import 'dotenv/config'
import { compareSync } from "bcryptjs";
import { prisma } from "../app";
import { AppError } from "../errors/AppError.errors";
import { SessionReq, User } from "../interfaces/user.interface";
import { sign } from "jsonwebtoken";

export const loginService = async (data: SessionReq): Promise<{token: string}> => {
  const user: User | null = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  })

  if(!user) throw new AppError('Invalid credentials', 401)

  const checkPass: boolean = compareSync(data.password, user.password)

  if(!checkPass) throw new AppError('Invalid credentials', 401)

  const token: string = sign(
    {email: user.email, username: user.username},
    process.env.SECRET_KEY!,
    { expiresIn: process.env.EXPIRES_IN!, subject: user.id}
  )

  return {token}
}