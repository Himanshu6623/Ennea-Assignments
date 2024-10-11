import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mode : "light",
}

export const ColorMode=createSlice({
    name:'color',
    initialState,
    reducers : {
        Changemode : (state)=>{
            if(state.mode==="light")
            {
                state.mode="Dark"
                document.body.style.backgroundColor='#042743'
            }
            else
            {
                state.mode="light";
                document.body.style.backgroundColor='white'
            }
        },
    }
}
)

export const {Changemode}=ColorMode.actions
export default ColorMode.reducer