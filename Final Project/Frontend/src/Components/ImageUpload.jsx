import React, { useState } from 'react';


export default function ImageUpload(){

    const [image,setImage]=useState()
    const convertToBASE64=(e)=>{

        var reader=new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=()=>{
            console.log(reader.result)
            setImage(reader.result)
        };
        reader.onerror=error=>{
            console.log("Error: ",error);
        };
        
    }
    return(
        <>
            <div>
                <h1>
                    Image Upload
                </h1>
                <input accept="/image" type='file' onChange={convertToBASE64}/>
                {image===""||image===null?
                    console.log("error"):
                    <img src={image} style={{height:"100px", width:"100px"}} alt=''/>
                }
            </div>
        </>
    )
}