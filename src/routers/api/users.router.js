import { Router } from "express"
import { userManager } from "../../dao/models/User.js"

export const usersRouter = Router()

usersRouter.post('/', async (req, res) => {
    try {
        const userData = await userManager.create(req.body)
        res.status(201).json({ status: 'success', payload: userData.toObject()})
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message})
    }
    
})