import React, { useEffect, useState } from 'react'
import CardProd from './CardProd';
import Swal from 'sweetalert2'


const ProductContainer = () => {
    const [dataProds, setDataProds] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:8080/api/productos/')
            .then((res) => res.json())
            .then((data) => {
                setDataProds(data)
                
            })
    }, [])
    function deleteItemById(e, idToDelete){
        e.preventDefault()
        const req = {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
        }
        fetch(`http://localhost:8080/api/productos/${idToDelete}`, req)
            .then((res) => res.json())
            .then((data) => {
                if(data.deleted){
                    Swal.fire({
                        icon: 'success',
                        title: 'Borrado',
                        text: `Se borro correctamente el producto con ID ${data.id}`,
                    })
                    setTimeout(()=>{
                        fetch('http://localhost:8080/api/productos/')
                            .then((res) => res.json())
                            .then((data) => {
                                setDataProds(data)
                            })
                    }, 10)
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `No se pudo borrar el producto con ID ${data.id} porque necesita ser Admin`,
                    })
                }
            })
            .catch((error) => console.log(error))
    }
    return (
        <div className='container pt-5'>
            <h1 className='text-center mb-5'>Productos</h1>
            <div className='container d-flex flex-wrap justify-content-around'>
                    {
                        dataProds.length > 0 ? 
                        dataProds.map((prod, i) => <CardProd key={i} prod={prod} deleteItemById={deleteItemById} />)
                        :
                        <h1>Cargando productos...</h1>
                    }
            </div>
        </div>
    )
}

export default ProductContainer