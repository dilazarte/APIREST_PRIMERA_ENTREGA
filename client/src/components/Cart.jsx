import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const Cart = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/api/carrito/2/productos')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data)
            })
            .catch((error) => console.log(error))
    }, [])
    function deleteItem(e, id){
        e.preventDefault();
        const req = {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"}
        }
        fetch(`http://localhost:8080/api/carrito/2/productos/${id}`, req)
            .then((res) => res.json())
            .then((data) => data)
            .catch((error) => console.log(error))
            
            setTimeout(()=>{
                fetch('http://localhost:8080/api/carrito/2/productos')
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data)
                })
                .catch((error) => console.log(error))
            }, 10)
    }
    return (
        <div className='container mt-5'>
            <h1 className='pb-3'>Carrito</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Foto</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map( (el, i) => {
                            return <tr key={i}>
                                <th scope="row">{el.id}</th>
                                <td>{el.nombre}</td>
                                <td>{el.descripcion}</td>
                                <td>{el.precio}</td>
                                <td><img src={el.foto} alt={el.nombre} width="50" /></td>
                                <td><button onClick={(e)=>{deleteItem(e, el.id)}} className='btn btn-outline-danger'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg>
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>


            {/* <ul>
            {
                products.map((el, i) => <li key={i}> {el.nombre} </li>)
            }
            </ul> */}
        </div>
    )
}

export default Cart