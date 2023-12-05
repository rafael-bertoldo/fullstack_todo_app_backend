import { Router } from "express";
import { userRouter } from "./user.router";
import { sessionRouter } from "./session.router";

export const router: Router = Router()

router.use('/users', userRouter)
router.use('/auth', sessionRouter)