import { Router } from "express";
import { verifyEmail, verifyUsername } from "../middlewares/user.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/user.schemas";
import { createUserController, deleteUserController, readUserProfileController, updateUserController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/ensureAuth.middleware";

export const userRouter: Router = Router()

userRouter.post('/', validateBody(createUserSchema), verifyEmail, verifyUsername, createUserController)
userRouter.use(verifyToken)
userRouter.get('/profile', readUserProfileController)
userRouter.patch('/profile', validateBody(updateUserSchema), verifyEmail, verifyUsername, updateUserController)
userRouter.delete('/profile', deleteUserController)