const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routers.-
const {routerProductos} = require('./src/routes/ProductosRoutes')
const {routerCarrito} = require('./src/routes/CarritoRoutes')

//defino las rutas
app.use('/api/productos', routerProductos); //Router para productos
app.use('/api/carrito', routerCarrito); //Router para carrito


const PORT = process.env.PORT || 8080;
//server on
const server = app.listen(8080, ()=>{
    console.log(`Server listening on port ${PORT}`)
})