import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Remove} from '../Redux/CounterSlice/CartSlice'
import styled from 'styled-components'

const Div=styled.div(
    {
        margin : '10px'
    }
)
const Image=styled.img(
    {
        height :'130px',
        width : '100px'
    }
)
export default function Cart()
{
    const count=useSelector(state=>state.Cart.Cart_Product)
    const price=useSelector(state=>state.Cart.Total_price)
    const mode=useSelector(state=>state.color.mode)
    const dispatch=useDispatch()
    const Card=count.map(product=>(
        <Div className="col-md-3 " key={product.id}>
            <div className="card h-100" style={{color : mode==='light'?'black' : 'white' ,backgroundColor : mode==='light'?'white' : 'black'}}>
              <Div className='text-center'>
                <Image src={product.image} className="card-img-top" alt="..." />
              </Div>
              <div className="card-body" >
                <h5 className="text-center">{product.title}</h5>
                <h6 className='text-center'>MRP:${product.price}</h6>
                <div className="dropdown text-center"  style={{margin : '10px'}} >
                    <a className=" dropdown-toggle" href="/" style={{color:'black'}} role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                      View details
                    </a>
                    <ul className="dropdown-menu p-4">
                        <span key={product.id + "-description"}>
                            {product.description}
                        </span>
                    </ul>
                </div>
              </div>
              <div className='card-footer text-center'>
                    <button type="button" className="btn btn-danger" onClick={()=>dispatch(Remove(product))}>Delete</button>
              </div>
            </div>
        </Div>
    ))
    return(
        <>
            <div className='text-center'>
                <h1 >
                    CART
                </h1>
                <span>
                    Total_Price : {parseFloat(price.toFixed(2))}
                </span>
            </div>
            <div className='row'>
                {Card}
            </div>
        </>
    );
}