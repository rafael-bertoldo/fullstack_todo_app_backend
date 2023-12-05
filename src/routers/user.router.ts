import { Router } from "express";
import { verifyEmail, verifyUsername } from "../middlewares/user.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createUserSchema } from "../schemas/user.schemas";
import { createUserController } from "../controllers/user.controller";

export const userRouter: Router = Router()

userRouter.post('/', validateBody(createUserSchema), verifyEmail, verifyUsername, createUserController)