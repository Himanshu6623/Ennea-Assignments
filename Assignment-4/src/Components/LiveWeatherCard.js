import React from 'react'
import styled from 'styled-components';
export default function Live_Weather_Card(prop)
{
    const Div=styled.div({
      backgroundColor: prop.mode==='dark'?'black':'white',
      color: prop.mode==='dark'?'white':'black'
    })
    return(
       <>
            <div className='container mb-4'>
                <div className="row">
                  <div className="col-sm-3">
                    <Div  className="card">
                    <img src={require("../Temperature.png")} className="card-img-top" style={{height:150}} alt=''></img>
                      <div className="card-body" >
                        <h5 className="card-title">Temperature</h5>
                        <p className="card-text">Today Temperature in {prop.place} is {Math.floor(prop.weather.main.temp-274)} C.</p>
                      </div>
                    </Div>
                  </div>
                  <div className="col-sm-3">
                    <Div className="card">
                    <img src={require("../Humidity.png")} className="card-img-top" style={{height:150}} alt=''></img>
                      <div className="card-body">
                        <h5 className="card-title">Humidity</h5>
                        <p className="card-text">Today Humidity in {prop.place} is {prop.weather.main.humidity}.</p>
                      </div>
                    </Div>
                  </div>
                  <div  className="col-sm-3">
                    <Div className="card">
                    <img src={require("../wind.png")} className="card-img-top" style={{height:150}} alt=''></img>
                      <div className="card-body">
                        <h5 className="card-title">Wind</h5>
                        <p className="card-text">Today the wind speed in {prop.place} is {prop.weather.wind.speed} km/h.</p>
                      </div>
                    </Div>
                  </div>
                  <div className="col-sm-3">
                    <Div className="card">
                    <img src={require("../clody.png")} className="card-img-top" style={{height:150}} alt=''></img>
                      <div className="card-body">
                        <h5 className="card-title">Cloudy</h5>
                        <p className="card-text">Today the sky in {prop.place} is {prop.weather.clouds.all}% cloudy.</p>
                      </div>
                    </Div>
                  </div>
                </div>
            </div>
       </> 
    );
}