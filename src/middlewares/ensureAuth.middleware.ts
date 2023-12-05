import 'dotenv/config'
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.errors";
import { verify } from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const {authorization} = req.headers

  if(!authorization) throw new AppError('Missing authorization token', 401)

  const token: string = authorization.split(" ")[1]

  const decoded = verify(token, process.env.SECRET_KEY!)

  res.locals = {...res.locals, decoded}

  return next()
}