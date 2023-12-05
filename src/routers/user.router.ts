import { Router } from "express";
import { verifyEmail, verifyUsername } from "../middlewares/user.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createUserSchema } from "../schemas/user.schemas";
import { createUserController, readUserProfileController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/ensureAuth.middleware";

export const userRouter: Router = Router()

userRouter.post('/', validateBody(createUserSchema), verifyEmail, verifyUsername, createUserController)
userRouter.use(verifyToken)
userRouter.get('/profile', readUserProfileController)