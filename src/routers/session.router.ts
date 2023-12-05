import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { sessionSchema } from "../schemas/user.schemas";
import { loginController } from "../controllers/session.controller";

export const sessionRouter: Router = Router()

sessionRouter.post('/login', validateBody(sessionSchema), loginController)