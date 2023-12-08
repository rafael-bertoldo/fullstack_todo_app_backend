import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createTodoSchema, updateTodoSchema } from "../schemas/todo.schemas";
import { createTodoController/*,  deleteTodoController, readTodoController, updateTodoController */ } from "../controllers/todo.controller";
import { verifyToken } from "../middlewares/ensureAuth.middleware";
import { verifyTitle } from "../middlewares/todo.middleware";

export const todoRouter: Router = Router()

todoRouter.use(verifyToken)
todoRouter.post('/', validateBody(createTodoSchema), verifyTitle, createTodoController)
// todoRouter.get('/profile', readTodoProfileController)
// todoRouter.patch('/profile', verifyEmail, verifyTodoname, updateTodoController)
// todoRouter.patch('/password', validateBody(updateTodoPasswordSchema), updateTodoPasswordController)
// todoRouter.delete('/profile', deleteTodoController)
// todoRouter.post('/password_recovery', emailController)