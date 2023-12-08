import { NextFunction, Request, Response } from "express";
import { prisma } from "../app";
import { AppError } from "../errors/AppError.errors";

export const verifyTitle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if(!req.body.title) return next()

  const todo = await prisma.todo.findUnique({
    where: {
      title: req.body.title
    }
  })
  
  if(todo) throw new AppError('Todo already exists', 409)
  
  return next()
}