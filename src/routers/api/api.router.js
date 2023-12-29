import { Router } from "express";
import { productsRouter } from "./products.router.js"
import { cartsRouter } from "./carts.router.js"
import { chatRouter } from "./chat.router.js";
import { usersRouter } from "./users.router.js";
import { sessionsRouter } from "./sessions.router.js";


export const apiRouter = Router()

apiRouter.use('/', productsRouter)
apiRouter.use('/', cartsRouter)
apiRouter.use('/', chatRouter)
apiRouter.use('/sessions', sessionsRouter)
apiRouter.use('/users', usersRouter)