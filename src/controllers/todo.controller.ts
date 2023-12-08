import { Request, Response } from "express";
import { createTodoService, deleteTodoService, readAllTodoService, readOneTodoService, readPendingTodoService, updateTodoService } from "../services/todo.service";
import { Todo, TodoArrayReturn, TodoReturn } from "../interfaces/todo.interface";

export const createTodoController = async (req: Request, res: Response): Promise<Response> => {
  const todo: Todo = await createTodoService(req.body, res.locals.decoded.sub)

  return res.status(201).json(todo)
}

export const readPendingTodoController = async (req: Request, res: Response): Promise<Response> => {
  const todos: TodoArrayReturn = await readPendingTodoService(res.locals.decoded.sub)

  return res.status(200).json(todos)
}

export const readAllTodoController = async (req: Request, res: Response): Promise<Response> => {
  const todos: TodoArrayReturn = await readAllTodoService(res.locals.decoded.sub)

  return res.status(200).json(todos)
}

export const readOneTodoController = async (req: Request, res: Response): Promise<Response> => {
  const { todo_id } = req.params

  const todo: TodoReturn = await readOneTodoService(res.locals.decoded.sub, todo_id)

  return res.status(200).json(todo)
}

export const updateTodoController = async (req: Request, res: Response): Promise<Response> => {
  const { todo_id } = req.params

  const todo: TodoReturn = await updateTodoService(req.body, res.locals.decoded.sub, todo_id)

  return res.status(200).json(todo)
}

export const deleteTodoController = async (req: Request, res: Response): Promise<Response> => {
  const { todo_id } = req.params

  await deleteTodoService(res.locals.decoded.sub, todo_id)

  return res.status(200).json({ message: 'Todo completed' })
}
