const express = require('express')
const {Router} = express
const {Carrito} = require('../models/carritoClass')
const carrito = new Carrito('./src/data/carrito.json')

const {Contenedor} = require('../models/Contenedor')
const container = new Contenedor('./src/data/productos.json')

const routerCarrito = Router()

//test admin
let admin = true

// <!-- ENDPOINTS PARA LA RUTA DE CARRITO -->
// POST para crear nuevo carrito
routerCarrito.post('/', async(req, res)=>{
    let idNewCart = await carrito.createCart();
    if(idNewCart){
        res.status(200).json({'Success':`Se creo nuevo carrito de compra con id ${idNewCart}`})
    }else{
        res.status(400).json({'Error':`No se pudo crear el carrito de compra`})
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
    if(admin){
        let id = parseInt(req.params.id)
        let prod = await carrito.getById(id)
        if(prod){
            res.status(200).json(prod.productos)
        }else{
            res.status(404).json({error: `Carrito con ID ${id} no encontrado`})
        }
    }else{
        res.status(200).json({Error: 'Necesita ser admin'})
    }
})
//POST para agregar un producto a la lista del carrito!
routerCarrito.post('/:id/productos', async(req, res)=>{
    let idCart = parseInt(req.params.id) //arreglar aca y consultar.
    let idProd = parseInt(req.body.id); // este objeto ahora para acceder al valor es con prod.id
    let prod = await container.getById(idProd)
    if(prod){
        let success = await carrito.addToCart(idCart, prod)
        if(success){
            res.status(200).json({Success: `Producto con ID ${idProd} agregado correctamente al Carrito con ID ${idCart}.`})
        }else{
            res.status(400).json({Error: `No se pudo agregar el producto porque el carrito con ID ${idCart} no existe.`})
        }
    }else{
        res.status(400).json({error: `Producto con ID ${idProd} no encontrado`})
    }
})
//DELETE para borrar un producto del carrito por ID de carrito y producto!
routerCarrito.delete('/:id_cart/productos/:id_prod', async(req, res)=>{
    let idCart = parseInt(req.params.id_cart) //arreglar aca y consultar.
    let idProd = parseInt(req.params.id_prod); // este objeto ahora para acceder al valor es con prod.id
    let deleteProd = await carrito.deleteProdOnCartById(idCart, idProd)
    res.status(200).json({Result: deleteProd})
})

module.exports = {routerCarrito}
// return routerCarrito