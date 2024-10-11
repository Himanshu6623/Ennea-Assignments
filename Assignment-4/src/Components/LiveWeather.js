import React,{useState} from 'react'
import LiveWeatherCard from './LiveWeatherCard'
export default function Live_Weather(props)
{
    const[place,setPlace]=useState("{Place_name}")
    
    const Place_Name=(event)=>
    {
        setPlace(event.target.value)
    }
    const[weather,setweather]=useState({'main':{'temp':274,'humidity':0},'wind':{'speed':0},'clouds':{'all':0}})
    async function Weather(){
    try {
        const url = 'https://weather-api138.p.rapidapi.com/weather?city_name='+String(place);
        const options = {
        	method: 'GET',
        	headers: {
        		'x-rapidapi-key': 'e0b5685f7amsh8717fa72e53348dp1505ddjsnabb7d1c5a432',
        		'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
        	}
        };
        const response = await fetch(url, options);
        const result = await response.json();
        if(result.hasOwnProperty("message"))
        {
            setweather({'main':{'temp':274,'humidity':0},'wind':{'speed':0},'clouds':{'all':0}})
            props.showAlert(` : ${result.message}`,'warning')
        }
        else
        {
            setweather(result)
            props.showAlert(" : Place Found",'success')
        }
        } 
        catch (error) {
        	console.log(error);
            props.showAlert(" : Network issue",'warning')
        }
    }
    return(
        <>
            <br/>
            <div className="d-flex">
                <input className="form-control me-2" style={{backgroundColor: props.mode==='dark'?'black':'white', color: props.mode==='dark'?'white':'black'}} value={place} onChange={Place_Name}  placeholder="Enter the Place name forExample-Delhi,Hyderabad" aria-label="Search" />
                <button  className="btn btn-success" onClick={Weather} >Search</button>
            </div><br/><br/>
            <LiveWeatherCard place={place} weather={weather} mode={props.mode}/>
            
        </>
    );
}