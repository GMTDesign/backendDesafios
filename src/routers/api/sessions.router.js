import { Router } from "express"
import { userManager } from "../../dao/models/User.js"

export const sessionsRouter = Router()

sessionsRouter.post('/', async (req, res) => {
    const user = await userManager.findOne(req.body)
    if (!user) {
        return res.status(401).json({ status: 'error', message: 'Login incorrecto'})
    }
    req.session['user'] = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }

    if (user.email === 'adminCoder@coder.com') {
        req.session['user'].rol = 'admin'
    } else {
        req.session['user'].rol = 'usuario'
    }
    
    res.status(201).json({ status: 'success', payload: req.session['user']})
})

sessionsRouter.delete('/current', async (req, res) => {
    req.session.destroy( err => {
        res.status(204).json({ status: 'success'})
    })
})