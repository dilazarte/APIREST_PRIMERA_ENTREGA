import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ProductInfoEdit = () => {
    const [prodInfo, setProdInfo] = useState({
        nombre:'',
        descripcion:'',
        foto:'',
        codigo:'',
        precio:'',
        stock:'',
    })
    const [edit, setEdit] = useState(false);
    const {id} = useParams();

    function onChange(e) {
        const newData = { ...prodInfo, [e.target.name]: e.target.value }
        setProdInfo(newData)
        console.log(newData)
    }
    
    useEffect(()=>{
        fetch(`http://localhost:8080/api/productos/${id}`)
            .then((res) => res.json())
            .then((data => setProdInfo(data)))
    }, [edit])

    function enableEdit(){
        setEdit(true)
    }

    function editInfo(e){
        e.preventDefault();
        const req = {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(prodInfo)
        }
        fetch(`http://localhost:8080/api/productos/${id}`, req)
            .then((res) => res.json())
            .then((data) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Actualizado',
                    text: data.Success
                })
            })
            .catch((error) => console.log(error))
            setEdit(false)

            setTimeout(()=>{
                fetch(`http://localhost:8080/api/productos/${id}`)
                .then((res) => res.json())
                .then((data => setProdInfo(data)))
            }, 10)
            
    }

    return (
        <div className='container border rounded p-3 mt-5'>
            <h1 className="mb-3">Editar Producto:</h1>
            <button className='btn btn-success mb-3 text-center d-flex align-items-center' onClick={()=>enableEdit()}><FaEdit className='me-1' /> Editar</button>
            <form onSubmit={(e)=>{editInfo(e)}}>
                <input onChange={(e)=>onChange(e)} name='nombre' className="form-control mb-3" disabled={ edit ? false : true} type="text" placeholder='Nombre del producto' value={prodInfo.nombre}></input>
                <input onChange={(e)=>onChange(e)} name='descripcion' className="form-control mb-3" disabled={ edit ? false : true} type="text" placeholder='Descripcion' value={prodInfo.descripcion}></input>
                <input onChange={(e)=>onChange(e)} name='foto' className="form-control mb-3" disabled={ edit ? false : true} type="text" placeholder='Foto/imagen (URL)' value={prodInfo.foto}></input>
                <input onChange={(e)=>onChange(e)} name='codigo' className="form-control mb-3" disabled={ edit ? false : true} type="text" placeholder='Codigo de producto' value={prodInfo.codigo}></input>
                <input onChange={(e)=>onChange(e)} name='precio' className="form-control mb-3" disabled={ edit ? false : true} type="number" placeholder='Precio' value={prodInfo.precio}></input>
                <input onChange={(e)=>onChange(e)} name='stock' className="form-control mb-3" disabled={ edit ? false : true} type="number" placeholder='Stock' value={prodInfo.stock}></input>
                <button type='submit' className='btn btn-primary'>Actualizar</button>
            </form>
        </div>
    )
}

export default ProductInfoEdit