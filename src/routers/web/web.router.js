import { Router } from "express"
import { cartManager, productManager } from "../../dao/mongoDB/mongoDB.js"
import { onlyActives } from "../../middlewares/activeSession.js"

export const webRouter = Router()

webRouter.get('/home', async (req, res) => {
    const parameters = {}
    if (req.query.category) { parameters.category = req.query.category }
    if (req.query.status) { parameters.status = req.query.status}

    const paginateOptions = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        lean: true
    }
    if (req.query.sort) { paginateOptions.sort = ({price: req.query.sort}) }

    const products = await productManager.paginate(parameters, paginateOptions)
       
    res.render('home.handlebars', {
        
        productsFlag: products.docs.length > 0,
        ...products,
        ...req.session['user']
        
    })

})

webRouter.get('/chat', async (req, res) => {
    res.render('chat.handlebars')
})

webRouter.get('/cart/:cid', async (req, res) => {
    const cid = req.params.cid
    const searchedCart = await cartManager.find({_id: cid}, {'products._id': 0})
    console.log(searchedCart)
    const cartId = searchedCart[0]._id
    const cartProducts = searchedCart[0].products.map(product => {
        return {
            ...product.toJSON().product,
            quantity: product.quantity
        }
    })
    console.log(cartId)
    console.log(cartProducts)
    res.render('cart.handlebars', {
        cartId,
        cartProducts: {...cartProducts}
    })

})

webRouter.get('/register', (req, res) => {
    res.render('register.handlebars')
})

webRouter.get('/login', (req, res) => {
    res.render('login.handlebars')
})


webRouter.get('/profile', onlyActives, (req, res) => {
    res.render('profile.handlebars', {...req.session['user']})
})