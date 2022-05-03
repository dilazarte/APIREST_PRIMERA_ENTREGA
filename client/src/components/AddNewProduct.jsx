import React, { useState } from 'react'
import Swal from 'sweetalert2'

const AddNewProduct = () => {
    const urlPOST = 'http://localhost:8080/api/productos/'
    const [dataProd, setDataProd] = useState({
        nombre: "",
        descripcion:"",
        foto: "",
        codigo: "",
        precio: "",
        stock: "",
    })
    function onChange(e) {
        const newData = { ...dataProd, [e.target.name]: e.target.value }
        setDataProd(newData)
        console.log(newData)
    }
    function submitF(e) {
        e.preventDefault();
        const prod = {
            nombre : dataProd.nombre,
            descripcion : dataProd.descripcion,
            foto : dataProd.foto,
            codigo : dataProd.codigo,
            precio : dataProd.precio,
            stock : dataProd.stock,
        }
        console.log(prod)
        const req = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(prod)
        }
        fetch(urlPOST, req)
            .then( (res) => res.json() )
            .then((data) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Añadido',
                    text: data.Success
                })
            })
            .catch( (error) => console.log(error) )
    }
    return (
        <div className='container'>
            <h1 className='text-center'>Añadir nuevo Producto</h1>
            <form onSubmit={(e)=> { submitF(e) }}>
                <input onChange={(e) => onChange(e)} name='nombre' className="form-control mb-3" type="text" placeholder='Nombre del producto' value={dataProd.nombre}></input>
                <input onChange={(e) => onChange(e)} name='descripcion' className="form-control mb-3" type="text" placeholder='Descripcion' value={dataProd.descripcion}></input>
                <input onChange={(e) => onChange(e)} name='foto' className="form-control mb-3" type="text" placeholder='Foto/imagen (URL)' value={dataProd.foto}></input>
                <input onChange={(e) => onChange(e)} name='codigo' className="form-control mb-3" type="text" placeholder='Codigo de producto' value={dataProd.codigo}></input>
                <input onChange={(e) => onChange(e)} name='precio' className="form-control mb-3" type="number" placeholder='Precio' value={dataProd.precio}></input>
                <input onChange={(e) => onChange(e)} name='stock' className="form-control mb-3" type="number" placeholder='Stock' value={dataProd.stock}></input>
                <button type='submit' className='btn btn-primary'>Agregar</button>
            </form>
        </div>
    )
}

export default AddNewProduct