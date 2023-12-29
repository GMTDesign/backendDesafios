import { messageManager } from "../dao/models/Message.js"

export async function getController (req, res) {
    const messages = await messageManager.find().lean()
    if (!messages) {
        return res.status(400).json({ message: 'problemas al leer el archivo' })
    }
    res.json(messages)
}

export async function postController(req, res) {
    const {user, message } = req.body
    try {
        const newMessage = await messageManager.create({user, message})
        res['refreshWeb']()
        console.log(newMessage.toObject())
        res.json(newMessage.toObject())
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}