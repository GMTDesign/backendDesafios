import { productManager } from '../dao/mongoDB/mongoDB.js'

export async function getController (req, res) {
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
    let result
    if (products) {
        result = {
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage
       }
    } else {
        result = {
            status: 'error',
            payload: []
       }
    }
    res.json(result)
}

export async function getByIdController (req, res) {
    const id = req.params.pid
    const searched = await productManager.findById(id).lean()
    if (!searched) {
        return res.status(404).json({ message: 'producto inexistente' })
    }
    res.json(searched)
}

export async function postController (req, res) {
    if (req.file) {
        req.body.thumbnails = req.file.filename
    }
    const {title, description, code, price, status, stock, category, thumbnails} = req.body
    try {
        const newProduct = await productManager.create({title, description, code, price, status, stock, category, thumbnails})
           res.json(newProduct.toObject())
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function putController (req, res) {
    const id = req.params.pid
    if (req.file) {
        const updateImages = await productManager.findById(id)
        updateImages.addThumbnail(req.file.filename)
    }
    const data = req.body
    let updatedProduct
    try {
      updatedProduct = await productManager.findByIdAndUpdate(id, { $set: data }, { new: true })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
    if (!updatedProduct) {
        return res.status(404).json({ message: 'producto no encontrado'})
    }
    res.json(updatedProduct)
}

export async function deleteController (req, res) {
    const id = req.params.pid
    const deletedProduct = await productManager.findByIdAndDelete(id)
    if (!deletedProduct) {
       return res.status(404).json({ message: 'producto inexistente'})
    }
    res.json(deletedProduct)
}




// export async function getController (req, res) {
//     const { limit } = req.query
//     if (limit){
//         try {
//             res.json(await productManager.getProductsWithLimit({ limit }))
//         } catch (error) {
//             res.status(404).json({
//                 message: 'error al leer el archivo'
//             })
//         }
//     } else {
//         try {
//             res.json(await productManager.getProducts())
//         } catch (error) {
//             res.status(404).json({
//                 message: 'error al leer el archivo'
//             })
//         }
    
//     }
// }
