import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createTodoSchema, updateTodoSchema } from "../schemas/todo.schemas";
import { createTodoController, readOneTodoController, readAllTodoController, readPendingTodoController, deleteTodoController, updateTodoController } from "../controllers/todo.controller";
import { verifyToken } from "../middlewares/ensureAuth.middleware";
import { verifyTitle } from "../middlewares/todo.middleware";

export const todoRouter: Router = Router()

todoRouter.use(verifyToken)
todoRouter.post('/', validateBody(createTodoSchema), verifyTitle, createTodoController)
todoRouter.get('/', readAllTodoController)
todoRouter.get('/pending', readPendingTodoController)
todoRouter.get('/:todo_id', readOneTodoController)
todoRouter.patch('/:todo_id', validateBody(updateTodoSchema), verifyTitle, updateTodoController)
todoRouter.delete('/:todo_id', deleteTodoController)
