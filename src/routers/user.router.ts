import { Router } from "express";
import { verifyEmail, verifyUsername } from "../middlewares/user.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createUserSchema, updateUserPasswordSchema, updateUserSchema } from "../schemas/user.schemas";
import { createUserController, deleteUserController, readUserProfileController, updateUserController, updateUserPasswordController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/ensureAuth.middleware";
import { emailController } from "../controllers/email.controller";
import { upload } from "../middlewares/multer.middleware";

export const userRouter: Router = Router()

userRouter.post('/', upload.single('avatar'), verifyEmail, verifyUsername, createUserController)
userRouter.use(verifyToken)
userRouter.get('/profile', readUserProfileController)
userRouter.patch('/profile', upload.single('avatar'), verifyEmail, verifyUsername, updateUserController)
userRouter.patch('/password', validateBody(updateUserPasswordSchema), updateUserPasswordController)
userRouter.delete('/profile', deleteUserController)
userRouter.post('/password_recovery', emailController)