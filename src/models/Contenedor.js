const fs = require('fs');

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

class Contenedor{
    constructor(ruta){
        this.ruta =  ruta
    }
    async save(object){
        try{
            let array = await this.getAll() //obtengo datos de mi json
            let autoId = idAuto(array)
            object.id = autoId
            array.push(object)
            await fs.promises.writeFile(this.ruta, JSON.stringify(array))
            return autoId;
        }
        catch(err){
            console.log(err)
        }
        
    }
    async getById(n){
        try{
            let array = await this.getAll()
            let item = array.filter(el => el.id == n)
            return item[0]
        }
        catch(error){
            console.log(error)
        }
        
    }
    async getAll(){
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf-8')
            let array = JSON.parse(data)
            return array
        }
        catch(error){
            console.log(error)
            return []
        }
    }
    async deleteById(n){
        let array = JSON.parse(await fs.promises.readFile(this.ruta, 'utf-8'))
        let newArr = array.filter(el => el.id !== n)
        await fs.promises.writeFile(this.ruta, JSON.stringify(newArr))
    }
    async deleteAll(){
        let newArr = []
        //fs.writeFileSync(this.ruta, JSON.stringify(newArr))
        await fs.promises.writeFile(this.ruta, JSON.stringify(newArr))
    }
    async editById(id, newData){ //testing
        try{
            const {nombre, precio, foto, descripcion, stock} = newData
            let array = await this.getAll()
            let item = array.find(el => el.id === parseInt(id))
            let index = array.indexOf(item)
            if(item){
                nombre ? array[index].nombre = nombre : array[index].nombre = array[index].nombre
                precio ? array[index].precio = parseInt(precio) : array[index].precio = array[index].precio
                foto ? array[index].foto = foto : array[index].foto = array[index].foto
                descripcion ? array[index].descripcion = descripcion : array[index].descripcion = array[index].descripcion
                stock ? array[index].stock = parseInt(stock) : array[index].stock = array[index].stock
                
                await fs.promises.writeFile(this.ruta, JSON.stringify(array))
                return `Actualizado el producto con id: ${id}`
            }else{
                return "No existe el producto con ID ingresado"
            }
        }
        catch(error){
            console.log(error)
        }
    }
}
module.exports = {Contenedor}