import { Request, Response } from "express";
import { createTodoService, readOneTodoService, readTodoService } from "../services/todo.service";
import { Todo, TodoArrayReturn, TodoReturn } from "../interfaces/todo.interface";

export const createTodoController = async (req: Request, res: Response): Promise<Response> => {
  const todo: Todo = await createTodoService(req.body, res.locals.decoded.sub)

  return res.status(201).json(todo)
}

export const readTodoController = async (req: Request, res: Response): Promise<Response> => {
  const todos: TodoArrayReturn = await readTodoService(res.locals.decoded.sub)

  return res.status(200).json(todos)
}

export const readOneTodoController = async (req: Request, res: Response): Promise<Response> => {
  const {todo_id} = req.params

  const todo: TodoReturn = await readOneTodoService(res.locals.decoded.sub, todo_id)

  return res.status(200).json(todo)
}

// export const createTodoController = async (req: Request, res: Response): Promise<Response> => {}

// export const createTodoController = async (req: Request, res: Response): Promise<Response> => {}
