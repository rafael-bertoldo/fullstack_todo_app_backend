import { NextFunction, Request, Response } from "express";
import { prisma } from "../app";
import { AppError } from "../errors/AppError.errors";

export const verifyUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {username} = req.body

  if(!username) return next()
  
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if(user) throw new AppError('Username already exists', 409)
  
  return next()
}

export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {email} = req.body

  if(!email) return next()
  
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if(user) throw new AppError('Email already exists', 409)
  
  return next()
}

// export const verifyUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const headers = req.headers
  
//   const user = await prisma.user.findUnique({
//     where: {
//       id
//     }
//   })

//   if(!user) throw new AppError('User not found', 404)

//   res.locals = {...res.locals, user}
  
//   return next()
// }