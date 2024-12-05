import { createSlice } from "@reduxjs/toolkit";

const initialState={
    JwtToken:"",
    admin:0,
}

export const JwtToken=createSlice({
    name:'Token',
    initialState,
    reducers:{
        NewJwtToken:(state,action)=>{
            state.JwtToken=action.payload
        },
        NewAdmin:(state,action)=>{
            state.admin=action.payload
        },
    }
})

export const {NewJwtToken,NewAdmin}=JwtToken.actions
export default JwtToken.reducer