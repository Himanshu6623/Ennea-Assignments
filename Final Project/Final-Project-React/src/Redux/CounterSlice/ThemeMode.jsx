import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mode:"light",
    style:{
        color:'black'
      },
    btntxt:"Dark",
}

export const ThemeMode=createSlice({
    name:"Theme",
    initialState,
    reducers:{
        ChangeMode:(state)=>{
            if(state.mode==="light")
            {
                state.mode="dark"
                state.style.color='white'
                state.btntxt='Light'
            }
            else
            {
                state.mode="light"
                state.style.color='black'
                state.btntxt='Dark'
            }
        }
    }
}) 

export const {ChangeMode}=ThemeMode.actions
export default ThemeMode.reducer