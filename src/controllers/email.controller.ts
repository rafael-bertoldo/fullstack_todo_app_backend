import { NextFunction, Request, Response } from "express";
import { emailService } from "../services/email.service";
import { User } from "@prisma/client";
import { prisma } from "../app";
import { AppError } from "../errors/AppError.errors";

export const emailController = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: res.locals.decoded.sub
    }
  })

  if(!user) throw new AppError('User not found, please verify your token', 404)

  const text: string = `Para atualizar sua senha utilize o código: ${user.password_recovery}`
  await emailService({subject: 'Password recovery', text, to: user.email})

  return res.status(200).json({message: 'Recovery pass code sended to email'})
}