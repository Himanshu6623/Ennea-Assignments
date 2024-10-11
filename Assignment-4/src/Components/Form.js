import React,{useState} from 'react'
import PropTypes from 'prop-types'
export default function Form(props)
{
    const[text,setText]=useState(`Enter your text here`);
    //text is passed and converted to lowercase
    const LowerCase =()=>{
        if(text.length===0)
        {
            props.showAlert(" : The text field is empty",'warning')
        }
        else
        {
            setText(text.toLowerCase());
            props.showAlert(" : The text is converted to LowerCase",'success')
        }
    }
    //text is passed into uppercase function
    const UpperCase =()=>{
        if(text.length===0)
            {
                props.showAlert(" : The text field is empty",'warning')
            }
            else
            {
                setText(text.toUpperCase());
                props.showAlert(" : The text is converted to UpperCase",'success')
            }
    }
    //For clearing text
    const Clear_Text=()=>{
        setText("");
        props.showAlert(" : The text is cleared",'success')
    }
    //used in order to take input into the textarea
    const ChangeText=(event)=>
    {
        setText(event.target.value)
    }
    //copy text
    const CopyText=()=>
    {
        let text=document.getElementById("mybox")
        if(text.length===0)
        {
            props.showAlert(" : The text field is empty",'warning')
        }
        else
        {
            text.select()
            navigator.clipboard.writeText(text.value)
            props.showAlert(" : The text is successfully Copied",'success')
        }
    }
    
    return(
        <>
            <div className="container">
                <h1 style={props.style}><i>{props.heading}</i></h1>
                <div className="mb-3">
                  <textarea className="form-control" style={{backgroundColor: props.mode==='dark'?'black':'white', color: props.mode==='dark'?'white':'black'}} value={text} onChange={ChangeText} id="mybox" rows="6"></textarea>
                </div>
                <button className="btn btn-primary mx-2" onClick={UpperCase}>Convert to UpperCase</button>
                <button className="btn btn-primary mx-4" onClick={LowerCase}>Convert to LowerCase</button>
                <button className="btn btn-primary mx-2" onClick={Clear_Text}>Clear Text</button>
                <button className="btn btn-primary mx-3" onClick={CopyText}>Copy Text</button>
            </div>
            <div className='container my-3'>
                <h1 style={props.style}><i>Text Summary</i></h1>
                <p style={props.style}><i>{text.length} characters and {text.split(" ")[text.split(" ").length-1].length===0?text.split(" ").length-1:text.split(" ").length} words</i></p>
                <p style={props.style}><i>{text.split(" ")[text.split(" ").length-1].length===0?0.008*(text.split(" ").length-1):0.008*text.split(" ").length} minutes required to read the above content</i></p>
                <h2 style={props.style}><i>Preview</i></h2>
                <p style={props.style}><i>{text}</i></p>
            </div>
        </>
    );
}

Form.propTypes={
    heading : PropTypes.string
}

Form.defaultProps={
    heading : "HEADING"
}
