import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* <a class="navbar-brand" href="#">Navbar</a> */}
                <img width="120" className='navbar-brand' src='https://rhapsodist-blog.netlify.app/static/d3bef4d7228d33975c43ee37bba95dbd/ee604/2020-04-16-2-27-41.png'></img>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link active" aria-current="page" href="#">Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/cargarproducto'} className="nav-link" href="#">Cargar Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/carrito'} className="nav-link" href="#">Carrito</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar