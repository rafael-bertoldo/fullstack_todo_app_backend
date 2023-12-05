import { Request, Response } from "express";
import { UserReturn } from "../interfaces/user.interface";
import { createUserService, deleteUserService, readUserProfileService, updateUserService } from "../services/user.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await createUserService(req.body)

  return res.status(200).json(user)
}

export const readUserProfileController = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await readUserProfileService(res.locals.decoded.email)
  return res.status(200).json(user)
}

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await updateUserService(req.body, res.locals.decoded.sub)

  return res.status(200).json(user)
}

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
  await deleteUserService(res.locals.decoded.sub)

  return res.status(200).json({message: 'User deleted successfully'})
}

// export const createUserController = async (req: Request, res: Response): Promise<Response> => {}
// export const createUserController = async (req: Request, res: Response): Promise<Response> => {}