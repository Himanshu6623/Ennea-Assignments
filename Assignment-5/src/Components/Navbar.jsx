import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
export default function Navbar() {
    const NAV=styled.nav({
        width:"100%"
    })
    return (
        <>
            <NAV className="navbar navbar-expand-lg bg-body-tertiary" >
                <div className="container-fluid" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Link className="navbar-brand" to="/">E-COMMERCE</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/productCard">Card</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/Addproduct">Add Product</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </NAV>
        </>
    );
}
