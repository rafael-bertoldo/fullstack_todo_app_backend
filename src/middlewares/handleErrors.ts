import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";

export const handleErrors = (err: unknown, req: Request, res: Response, next: NextFunction): Response => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message })
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ message: err.message })
  }

  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.flatten().fieldErrors })
  }

  console.log(err)
  return res.status(500).json({ message: 'Internal server error' })
}