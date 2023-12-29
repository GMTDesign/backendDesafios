import mongoose from "mongoose"


await mongoose.connect('mongodb+srv://gmt1971:vrjm1971@cluster0.ppkewj1.mongodb.net/ecommerce')
console.log('se conectó a MongoDB')
export { productManager } from "../models/Product.js"
export { cartManager } from "../models/Cart.js"
export { messageManager } from "../models/Message.js"