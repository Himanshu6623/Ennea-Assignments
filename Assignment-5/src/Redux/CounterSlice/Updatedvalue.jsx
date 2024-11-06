import { createSlice } from "@reduxjs/toolkit";

const initialState={
    products:[]
}

export const Updatedvalue=createSlice({
    name:'update',
    initialState,
    reducers:{
        New:(state,action)=>{
            state.products=action.payload
        },
        Add:(state,action)=>{
            state.products.push(action.payload)
        }
    }
})

export const {New,Add}=Updatedvalue.actions
export default Updatedvalue.reducer