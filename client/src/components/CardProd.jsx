import React from 'react'
import { Link } from 'react-router-dom'

const CardProd = ({prod, deleteItemById}) => {
    return (
        <div className="card mb-3" style={{width: '18rem'}}>
            <img src={prod.foto} className="card-img-top" alt={prod.descripcion} />
                <div className="card-body">
                    <h5 className="card-title">{prod.nombre}</h5>
                    <p className="card-text">{prod.descripcion}</p>
                    <p className="card-text">Precio: {prod.precio}</p>
                    <p className="card-text">Stock: {prod.stock}</p>
                    <Link to={`/editar/${prod.id}`} className="btn btn-success me-2">Editar</Link>
                    <button onClick={(e)=>{deleteItemById(e, prod.id)}} className="btn btn-danger">Eliminar</button>
                </div>
        </div>
    )
}

export default CardProd