import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get } from '../Redux/CounterSlice/SearchSlice';
import { Changemode } from '../Redux/CounterSlice/ColorMode';

export default function Navbar() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState("");
  const count = useSelector((state) => state.Cart.Cart_Product);
  const mode = useSelector((state) => state.color.mode);

  const Find_Product = (event) => {
    setProduct(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault(); 
    dispatch(get(product)); 
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`} >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ fontSize: '20px' ,color : mode==="light"?"black" : "white"}}>
            <img src={require('../Icon.png')} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
            Home
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
              <li className="nav-item" style={{ fontSize: '20px' }}>
                <Link className="navbar-brand" aria-current="page" to="/Products"  style={{color : mode==="light"?"black" : "white"}}>
                Products
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <Link className='navbar-brand' to="/Cart" style={{color : mode==="light"?"black" : "white"}}>
                <img src={require('../cart.png')} alt="Cart" width="30" height="24" className="d-inline-block align-text-top" />
                {count.length}
              </Link>
              <input list="Options" style={{color : mode==="light"?"black" : "white" , backgroundColor : mode==="light"?"white" : "black"}} className="form-control me-2" type="search"  placeholder="Product Category" value={product} onChange={Find_Product} aria-label="Search" />
                <datalist id="Options" >
                  <option value="All products">All products</option>
                  <option value="men's clothing" >men's clothing</option>
                  <option value="jewelery" >jewelery</option>
                  <option value="electronics" >electronics</option>
                  <option value="women's clothing" >women's clothing</option>
                </datalist>
              <button className="btn btn-outline-success" type="submit">Search</button>
              <input className="form-check-input"  onClick={()=>{dispatch(Changemode())}} type="checkbox" role="switch" id="flexSwitchCheckChecked" />
              <label className="form-check-label" style={{color : mode==="light"?"black" : "white"}} htmlFor="flexSwitchCheckChecked">{mode==="light"?"Dark" : "light"}</label>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
