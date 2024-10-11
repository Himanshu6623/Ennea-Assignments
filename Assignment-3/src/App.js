import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import Navbar from './Components/Navbar.js';
import Products from './Components/Products.js';
import Cart from './Components/Cart.js';
import DashBoard from './Components/DashBoard.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
function App()
{
    return(
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={
              <DashBoard />
            }/>
            <Route exact path='/Cart' element={
              <Cart />
            }/>
            <Route exact path='/Products' element={
              <Products />
            }/>
          </Routes>
        </Router>
      </>
    );
}

export default App;

