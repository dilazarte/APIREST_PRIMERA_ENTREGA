const express = require('express')
const {Router} = express
const {Contenedor} = require('../models/Contenedor')
const container = new Contenedor('./src/data/productos.json')


const routerProductos = Router()

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


module.exports = {routerProductos}
// return routerProductos