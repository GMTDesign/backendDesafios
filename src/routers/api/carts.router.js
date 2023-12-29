import { Router } from "express"
import { deleteController, deleteProductController, getByIdController, postController, postProductController, putController, putProductController } from "../../controllers/cartsControllers.js"

export const cartsRouter = Router()



cartsRouter.get('/carts/:cid', getByIdController)
cartsRouter.post('/carts', postController)
cartsRouter.post('/carts/:cid/product/:pid', postProductController)
cartsRouter.put('/carts/:cid', putController)
cartsRouter.put('/carts/:cid/product/:pid', putProductController)
cartsRouter.delete('/carts/:cid', deleteController)
cartsRouter.delete('/carts/:cid/product/:pid', deleteProductController)
