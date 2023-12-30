import { Router } from "express"
import { deleteController, postController } from "../../controllers/sessionsControllers.js"

export const sessionsRouter = Router()

sessionsRouter.post('/', postController)
sessionsRouter.delete('/current', deleteController)