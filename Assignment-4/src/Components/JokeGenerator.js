import React,{useState} from 'react'

export default function Joke_Generator(props)
{ 
    const[joke,setJoke]=useState("select a joke Type and Category and click on generate joke")
    const[delivery,setdelivery]=useState("")
    const[api,setApi]=useState("https://v2.jokeapi.dev/joke/Dark?type=single&idRange=0-318")
    const[type,setType]=useState("single")
    const[catagory,setCatagory]=useState("Dark")
    async function Random_joke()
    {
        try
        {
        setApi("https://v2.jokeapi.dev/joke/"+String(catagory)+"?type="+String(type)+"&idRange=0-318")
        const response= await fetch(api)
        const result=await response.json()
        console.log(result)
        if(result.type==="single")
        {
            setJoke(result.joke)
            setdelivery("")
        }
        else if(result.type==="twopart")
        {
            setJoke(`Setup: ${result.setup}`)
            setdelivery(`Delivery: ${result.delivery}`)
        }
        else{
            console.log("failure")
        }
        }
        catch (error) {
        	console.log(error);
            props.showAlert(" : Network issue",'warning')
        }
    }
    const joke_type=(event)=>
    {
        setType(event.target.value)
    }
    const joke_catagory=(event)=>
    {
        setCatagory(event.target.value)
    }
    return(
        <>
        <div className='container'>
            <h1 style={{color: props.mode==='dark'?'white':'black'}}>Joke Generator</h1><br/>
            <label htmlFor="jokes_" id="lab" ><b>Jokes Category</b></label><br />
            <select style={{backgroundColor: props.mode==='dark'?'black':'white',color: props.mode==='dark'?'white':'black'}} id="catagory" alue={catagory} onChange={joke_catagory} defaultValue={'Dark'} className="form-select" aria-label="Default select example">
              <option value="Dark" >Dark</option>
              <option value="Misc" >Misc</option>
              <option value="Programming" >Programming</option>
              <option value="Pun" >Pun</option>
            </select>
            <br /><br />
            <label style={{color: props.mode==='dark'?'white':'black'}} htmlFor="type_" id="lab" ><b>Jokes Type</b></label><br />
            <select style={{backgroundColor: props.mode==='dark'?'black':'white',color: props.mode==='dark'?'white':'black'}} id="type" value={type} onChange={joke_type} className="form-select" aria-label="">
              <option value="Single" >Single</option>
              <option value="twopart" >Twopart</option>
            </select>
            <br /><br/>
            <div className="d-grid gap-2">
                <button style={{backgroundColor: props.mode==='dark'?'black':'white',color: props.mode==='dark'?'white':'black'}} className="btn btn-outline-info" onClick={Random_joke} >Generate joke</button>
            </div>
            <br/><br/><br/>
            <div className="card mb-3" >
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={require('../jokes.png')} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8" style={{backgroundColor: props.mode==='dark'?'black':'white',color: props.mode==='dark'?'white':'black'}}>
                  <div className="card-body" >
                    <h5 className="card-title" style={{fontSize:"30px"}}>JOKE</h5>
                    <p style={{fontSize:"18px"}}>{joke}</p>
                    <p style={{fontSize:"18px"}}>{delivery}</p>
                  </div>
                </div>
              </div>
            </div>

            </div>
        </>
    );
}