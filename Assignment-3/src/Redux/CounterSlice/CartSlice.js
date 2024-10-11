import {createSlice} from '@reduxjs/toolkit'

const initialState={
    Cart_Product: [],
    Total_price: 0
}

export const CartSlice=createSlice({
    name:'cart',
    initialState,
    
    reducers:{
        Add: (state,action)=>{
            state.Cart_Product.push(action.payload)
            state.Total_price+=action.payload.price
        },
        Remove: (state,action)=>{
            state.Cart_Product = state.Cart_Product.filter(item=>item.id!==action.payload.id)
            state.Total_price-=action.payload.price
        },
    },
})

export const {Add,Remove}=CartSlice.actions
export default CartSlice.reducer