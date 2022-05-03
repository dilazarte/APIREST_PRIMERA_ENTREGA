import './App.css';
import NavBar from './components/NavBar';
import ProductContainer from './components/ProductContainer';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddNewProduct from './components/AddNewProduct';
import ProductInfoEdit from './components/ProductInfoEdit';
import Cart from './components/Cart';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={ <ProductContainer /> } />
          <Route path='/cargarproducto' element={ <AddNewProduct /> } />
          <Route path='/editar/:id' element={ <ProductInfoEdit /> } />
          <Route path='/carrito' element={ <Cart /> } />
        </Routes>
      </BrowserRouter>
    </>
    
  );
}

export default App;
