import session from "express-session"
import connectMongo from 'connect-mongo'


const store = connectMongo.create({
    mongoUrl: 'mongodb+srv://gmt1971:vrjm1971@cluster0.ppkewj1.mongodb.net/ecommerce',
    ttl: 60 * 60 * 24
})

export const sessions = session({
    store,
    secret: 'secretMusic',
    resave: false,
    saveUninitialized: false
})