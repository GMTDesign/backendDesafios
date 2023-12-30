import express from 'express'
import { apiRouter } from './routers/api/api.router.js'
import handlebars from 'express-handlebars'
import { webRouter } from './routers/web/web.router.js'
import { Server } from 'socket.io'
import { cartManager, messageManager } from './dao/mongoDB/mongoDB.js'
import { sessions } from './middlewares/sessionsMid.js'


const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', './views')

const server = app.listen(8080, () => { console.log('se conectó al puerto 8080') })

const serverSocket = new Server(server)
app.use((req, res, next) => {
    res['refreshWeb'] = async () => {
        serverSocket.emit('messages', await messageManager.find())
    }
    next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('./static'))
app.use(express.static('./views'))
app.use(sessions)
app.use('/', webRouter)
app.use('/api', apiRouter)

serverSocket.on('connection', async (socket) => {
    
    socket.on('newProduct', async (id) => {
        console.log(id)
        cartManager.create({products: [{product: id}]})
      
    })
    // chat sockets
    serverSocket.emit('messages', await messageManager.find())
    socket.broadcast.emit('newUser', 'Nuevo usuario')

    socket.on('disconnect', () => {
        socket.broadcast.emit('userDisconnected', 'Desconexión')
    })

    socket.on('newMessage', async (newMessage) => {
        try {
            await messageManager.create(newMessage)
            serverSocket.emit('messages', await messageManager.find())
        } catch (error) {
            serverSocket.emit('error', error.message)   
        }
        
    })

    

})


