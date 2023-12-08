import { Request, Response } from "express";
import { UserReturn } from "../interfaces/user.interface";
import { createUserService, deleteUserService, readUserProfileService, updateUserPasswordService, updateUserService } from "../services/user.service";
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import { createUserSchema, updateUserSchema } from "../schemas/user.schemas";
import { cloudinaryConfig } from "../configs/cloudinary.config";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
  cloudinaryConfig()

  const upload = await cloudinary.uploader.upload(req.file!.path, (error, result) => result)

  fs.unlink(req.file!.path, (error) => {
    if(error) {
      console.log(error)
    }
  })

  const data = createUserSchema.parse({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    avatar: upload.url
  })

  const user: UserReturn = await createUserService(data)

  return res.status(200).json(user)
}

export const readUserProfileController = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await readUserProfileService(res.locals.decoded.email)
  return res.status(200).json(user)
}

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
  cloudinaryConfig()

  const upload = await cloudinary.uploader.upload(req.file!.path, (error, result) => result)

  fs.unlink(req.file!.path, (error) => {
    if(error) {
      console.log(error)
    }
  })

  const data = updateUserSchema.parse({
    username: req.body.username,
    email: req.body.email,
    avatar: upload.url
  })

  const user: UserReturn = await updateUserService(data, res.locals.decoded.sub)

  return res.status(200).json(user)
}

export const updateUserPasswordController = async (req: Request, res: Response): Promise<Response> => {
  const updatePass = await updateUserPasswordService(req.body, res.locals.decoded.sub)

  return res.status(200).json(updatePass)
}

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
  await deleteUserService(res.locals.decoded.sub)

  return res.status(200).json({message: 'User deleted successfully'})
}

// export const createUserController = async (req: Request, res: Response): Promise<Response> => {}