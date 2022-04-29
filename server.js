const express = require('express')
const {Router} = express
const {Contenedor} = require('./helpers/contemedor')
const container = new Contenedor('./helpers/productos.json')

const {Carrito} = require('./helpers/carrito/carritoClass')
const carrito = new Carrito('./helpers/carrito/carrito.json')

const app = express()
const routerProductos = Router()
const routerCarrito = Router()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//defino las rutas
app.use('/api/productos', routerProductos); //Router para productos
app.use('/api/carrito', routerCarrito); //Router para carrito



// <!-- ENDPOINTS PARA LA RUTA DE PRODUCTOS -->

//GET para listar todos los productos o por id.-
routerProductos.get('/:id?', async(req, res)=>{
    const id = req.params.id;
    const productos = await container.getAll()
    if(id){
        const productoById = await container.getById(id)
        if(productoById){
            res.status(200).json(productoById)
        }else{
            res.status(404).json({'Error': `Producto no encontrado con id ${id}`})
        }
    }else{
        res.status(200).json(productos)
    }
})
//POST para crear nuevo producto
routerProductos.post('/', async(req, res)=>{
    let newProducto = req.body
    newProducto.price = parseInt(newProducto.price)
    let id = await container.save(newProducto)
    res.status(200).json({"Estado:":`Se agrego correctamente el nuevo producto con nro de id: ${id}`})
})
//PUT para editar un producto por id
routerProductos.put('/:id', async(req, res)=>{
    try{
        let data = await container.editById(req.params.id, req.body)
        res.status(200).json({status: data})
    }
    catch(err){
        res.status(400).json({"error": err})
    }
})
//DELETE por id
routerProductos.delete('/:id', async (req, res)=>{
    try{
        let id = parseInt(req.params.id)
        await container.deleteById(id)
        res.status(200).json({status: `Se borro el producto con id: ${id}`})
    }
    catch(error){
        res.json({"error": error})
    }
})


// <!-- ENDPOINTS PARA LA RUTA DE CARRITO -->
// POST para crear nuevo carrito
routerCarrito.post('/', async(req, res)=>{
    let idNewCart = await carrito.createCart();
    if(idNewCart){
        res.status(200).send({'Success':`Se creo nuevo carrito de compra con id ${idNewCart}`})
    }else{
        res.status(400).send({'Error':`No se pudo crear el carrito de compra`})
    }
})
//DELETE para borrar un carrito de la lista por numero de id.-
routerCarrito.delete('/:id', async(req, res)=>{
    try{
        let id = parseInt(req.params.id)
        await carrito.deleteById(id)
        res.status(200).json({status: `Se borro el carrito con id: ${id}`})
    }
    catch(error){
        res.json({"error": error})
    }
})
//GET para listas los productos del carrito segun ID
routerCarrito.get('/:id/productos', async(req, res)=>{
    let id = parseInt(req.params.id)
    let prod = await carrito.getById(id)
    if(prod){
        res.status(200).json(prod.productos)
    }else{
        res.status(404).json({error: `Carrito con ID ${id} no encontrado`})
    }
})
//POST para agregar un producto a la lista del carrito!
routerCarrito.post('/:id/productos', async(req, res)=>{
    let idCart = parseInt(req.params.id) //arreglar aca y consultar.
    let idProd = parseInt(req.body.id); // este objeto ahora para acceder al valor es con prod.id
    let prod = await container.getById(idProd)
    let success = await carrito.addToCart(idCart, prod)
        if(success){
            res.status(200).send({Success: `Producto con ID ${idProd} agregado correctamente al Carrito con ID ${idCart}.`})
        }else{
            res.status(400).send({Error: `No se pudo agregar el producto al carrito.`})
        }
})
//DELETE para borrar un producto del carrito por ID de carrito y producto!
routerCarrito.delete('/:id_cart/productos/:id_prod', async(req, res)=>{
    let idCart = parseInt(req.params.id_cart) //arreglar aca y consultar.
    let idProd = parseInt(req.params.id_prod); // este objeto ahora para acceder al valor es con prod.id
    let deleteProd = await carrito.deleteProdOnCartById(idCart, idProd)
    res.status(200).send({Result: deleteProd})
})




const PORT = process.env.PORT || 8080;
//server on
const server = app.listen(8080, ()=>{
    console.log(`Server listening on port ${PORT}`)
})