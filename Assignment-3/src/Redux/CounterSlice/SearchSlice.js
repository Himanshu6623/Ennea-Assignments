import {createSlice} from '@reduxjs/toolkit'

const initialState={
    value:"",
    result:[]
}

export const SearchSlice=createSlice({
    name:'Search',
    initialState,
    
    reducers:{
        get: (state,action)=>{
            state.value=action.payload
        },
        products: (state,action)=>{
            state.result.push(action.payload)
        }
    },
})

export const {get}=SearchSlice.actions
export default SearchSlice.reducer