import { Router } from "express";
import { userRouter } from "./user.router";
import { sessionRouter } from "./session.router";
import { todoRouter } from "./todo.router";

export const router: Router = Router()

router.use('/users', userRouter)
router.use('/auth', sessionRouter)
router.use('/todos', todoRouter)