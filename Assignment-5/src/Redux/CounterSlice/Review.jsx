import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value : 0,
    reviews :[]
}

const Review=createSlice({
    name :"review",
    initialState,
    reducers :{
        Change: (state,action)=>
        {
            state.value=action.payload
        },
        Reviews: (state,action)=>
        {
            state.reviews.pop()
            state.reviews.push(action.payload)
        }
    }
})
export const {Change,Reviews}=Review.actions
export default Review.reducer