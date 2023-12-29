import { Router } from "express"
import { getController, getByIdController, postController, putController, deleteController } from "../../controllers/productsControllers.js"
import { extractFile } from "../../middlewares/middlewares.js"


export const productsRouter = Router()

productsRouter.get('/products', getController)

productsRouter.get('/products/:pid', getByIdController)

productsRouter.post('/products', extractFile('photo'), postController)

productsRouter.put('/products/:pid/', extractFile('photo'), putController)

productsRouter.delete('/products/:pid', deleteController)