const fs = require('fs');
const moment = require('moment');
const { Contenedor } = require('./Contenedor');

const idAuto = (array) => {
    let autoId = array.length + 1;
    if (array.length === 0) {
        autoId = 1;
    }
    else {
        while (true) {
            if (!array.indexOf(autoId)) {
                autoId = autoId + 1;
            } else {
                break;
            }
        }
    }
    return autoId;
};

class Carrito extends Contenedor{
    constructor(path){
        super(path);
    }
    async createCart(){
        try{
            let array = await this.getAll() //obtengo datos de mi json
            let autoId = idAuto(array)
            let newCarrito = {
                id: autoId,
                timeStamp: moment().format('DD/MM/YYYY - HH:MM:SS'),
                productos: []
            }
            array.push(newCarrito)
            await fs.promises.writeFile(this.ruta, JSON.stringify(array))
            return autoId;
        }
        catch(err){
            console.log(err)
        }
        
    }

    async addToCart(cartID, prod){
        try{
            let cartsArray = await this.getAll();
            let cartById = cartsArray.filter(el => el.id == cartID);
                if(cartById.length > 0) {
                    cartById[0].productos.push(prod);
                    await fs.promises.writeFile(this.ruta, JSON.stringify(cartsArray));
                    return true
                }else{
                    return false
                }
            
        }
        catch(error){
            return error
        }
        
    }
    async deleteProdOnCartById(idCart, idProd){
        try{
            let cartsArray = await this.getAll();
            let i = cartsArray.findIndex( el => el.id === idCart );
                if(i >= 0){
                    let i_prod = cartsArray[i].productos.findIndex( el => el.id === idProd );
                        if(i_prod >= 0 ){
                            let newArrProds = cartsArray[i].productos.filter(elems => elems.id !== idProd);
                            cartsArray[i].productos = newArrProds;
                            await fs.promises.writeFile(this.ruta, JSON.stringify(cartsArray));
                            return `Producto con ID ${idProd} borrado correctamente`
                        }else{
                            return `No se encontro el producto con ID ${idProd}`
                        }
                }else{
                    return `No se encontro el carrito con ID ${idCart}`
                }    
        }
        catch(error){
            return error
        }
    }

    // async getById(n){
    //     try{
    //         let array = await this.getAll()
    //         let item = array.filter(el => el.id == n)
    //         return item[0]
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
        
    // }
    // async getAll(){
    //     try{
    //         let data = await fs.promises.readFile(this.ruta, 'utf-8')
    //         let array = JSON.parse(data)
    //         return array
    //     }
    //     catch(error){
    //         console.log(error)
    //         return []
    //     }
    // }
    // async deleteById(n){
    //     let array = JSON.parse(await fs.promises.readFile(this.ruta, 'utf-8'))
    //     let newArr = array.filter(el => el.id !== n)
    //     await fs.promises.writeFile(this.ruta, JSON.stringify(newArr))
    // }
    // async deleteAll(){
    //     let newArr = []
    //     //fs.writeFileSync(this.ruta, JSON.stringify(newArr))
    //     await fs.promises.writeFile(this.ruta, JSON.stringify(newArr))
    // }
    // async editById(id, newData){ //testing
    //     try{
    //         const {title, price, thumbnail} = newData
    //         let array = await this.getAll()
    //         let item = array.find(el => el.id === parseInt(id))
    //         let index = array.indexOf(item)
    //         if(item){
    //             title ? array[index].title = title : array[index].title = array[index].title
    //             price ? array[index].price = parseInt(price) : array[index].price = array[index].price
    //             thumbnail ? array[index].thumbnail = thumbnail : array[index].thumbnail = array[index].thumbnail
                
    //             await fs.promises.writeFile(this.ruta, JSON.stringify(array))
    //             return `Actualizado el producto con id: ${id}`
    //         }else{
    //             return "No existe el producto con ID ingresado"
    //         }
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    // }
}

module.exports = {Carrito}