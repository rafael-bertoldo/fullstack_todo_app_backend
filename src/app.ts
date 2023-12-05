import express, { Application, json } from 'express'
import { router } from './routers'
import { handleErrors } from './middlewares/handleErrors.middleware'

export const app: Application = express()

app.use(json())

app.use('/v1', router)

app.use(handleErrors)