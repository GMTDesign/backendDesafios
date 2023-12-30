import { cartManager } from "../dao/models/Cart.js"

export async function getByIdController(req, res) {
    const cid = req.params.cid
    const searched = await cartManager.find({_id: cid}, {'products._id': 0})
    if (!searched) {
        return res.status(404).json({ message: 'carrito inexistente' })
    }
    res.json(searched)
}

export async function postController(req, res) {
    try {
        const newCart = await cartManager.create({products: []})
        res.json(newCart.toObject())
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function postProductController(req, res) {
    const cid = req.params.cid
    const pid = req.params.pid
    try {
        const addedProduct = await cartManager.findById(cid)
        addedProduct.addProduct(pid)
        res.json(addedProduct)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export async function putController (req, res) {
    const cid = req.params.cid
    try {
        const updatedCart = await cartManager.findByIdAndUpdate(cid)
        res.json(updatedCart)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export async function putProductController (req, res) {
    const cid = req.params.cid
    const pid = req.params.pid
    const { newQuantity } = req.body
    try {
        const updatedProduct = await cartManager.findByIdAndUpdate(cid, { $set: { products: { product: pid, quantity: newQuantity }}}, { new: true})
        res.json(updatedProduct)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export async function deleteController (req, res) {
    const cid = req.params.cid
    const deletedCart = await cartManager.findByIdAndUpdate(cid, { $set: products = []})
    if (!deletedCart) {
       return res.status(404).json({ message: 'carrito inexistente'})
    }
    res.json(deletedCart)
}

export async function deleteProductController (req, res) {
    const cid = req.params.cid
    const pid = req.params.pid
    const deletedProduct = await cartManager.findById(cid)
    deletedProduct.deleteProduct(pid)
    if (!deletedProduct) {
       return res.status(404).json({ message: 'producto inexistente'})
    }
    res.json(deletedProduct)
}