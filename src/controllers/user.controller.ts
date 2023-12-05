import { Request, Response } from "express";
import { UserReturn } from "../interfaces/user.interface";
import { createUserService } from "../services/user.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await createUserService(req.body)

  return res.status(200).json(user)
}

export const readUserProfileController = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json(res.locals.user)
}
// export const createUserController = async (req: Request, res: Response): Promise<Response> => {}
// export const createUserController = async (req: Request, res: Response): Promise<Response> => {}
// export const createUserController = async (req: Request, res: Response): Promise<Response> => {}
// export const createUserController = async (req: Request, res: Response): Promise<Response> => {}