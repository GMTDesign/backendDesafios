import { Router } from "express"
import { postController } from "../../controllers/usersController.js"

export const usersRouter = Router()

usersRouter.post('/', postController)