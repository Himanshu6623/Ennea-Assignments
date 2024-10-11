import React from 'react'
import { Link } from "react-router-dom"
export default function Navbar(props)
{
    return(
        <>
            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
              <div className="container-fluid">
                <Link className="navbar-brand" to="/">PROJECTS</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/JokeGenerator">Joke generator</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/LiveWeather">Live Weather</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/Textutils">TextUtils</Link>
                    </li>
                  </ul>
                  <div className="form-check form-switch">
                    <input className="form-check-input"  onClick={props.changemode} type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                    <label className="form-check-label" style={props.style} htmlFor="flexSwitchCheckChecked">{props.btntxt}</label>
                  </div>
                </div>
              </div>
            </nav>
        </>
    );
}