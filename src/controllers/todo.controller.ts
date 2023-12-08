import { Request, Response } from "express";
import { createTodoService } from "../services/todo.service";

export const createTodoController = async (req: Request, res: Response): Promise<Response> => {
  const todo = await createTodoService(req.body, res.locals.decoded.sub)

  return res.status(201).json(todo)
}

// export const createTodoController = async (req: Request, res: Response): Promise<Response> => {}

// export const createTodoController = async (req: Request, res: Response): Promise<Response> => {}

// export const createTodoController = async (req: Request, res: Response): Promise<Response> => {}

// export const createTodoController = async (req: Request, res: Response): Promise<Response> => {}
