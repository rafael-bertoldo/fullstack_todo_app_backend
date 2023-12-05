import { Router } from "express";
import { verifyEmail, verifyUsername } from "../middlewares/user.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createUserSchema, updateUserPasswordSchema, updateUserSchema } from "../schemas/user.schemas";
import { createUserController, deleteUserController, readUserProfileController, updateUserController, updateUserPasswordController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/ensureAuth.middleware";
import { emailController } from "../controllers/email.controller";

export const userRouter: Router = Router()

userRouter.post('/', validateBody(createUserSchema), verifyEmail, verifyUsername, createUserController)
userRouter.use(verifyToken)
userRouter.get('/profile', readUserProfileController)
userRouter.patch('/profile', validateBody(updateUserSchema), verifyEmail, verifyUsername, updateUserController)
userRouter.patch('/password', validateBody(updateUserPasswordSchema), updateUserPasswordController)
userRouter.delete('/profile', deleteUserController)
userRouter.post('/recovery_password', emailController)