import { createSlice } from "@reduxjs/toolkit";

const initialState={
    title:"",
    description:"",
    userId:"",
    category:"",
    price:"",
    discountPercentage:"",
    rating:"",
    stock:"",
    warrantyInformation:"",
    shippingInformation:"",
    availabilityStatus:"",
    images :[]
}

export const Search=createSlice({
    name:"Addproduct",
    initialState,
    reducers :{
        NewTitle : (state,action)=>{
            state.title=action.payload
        },
        NewUserId : (state,action)=>{
            state.userId=action.payload
        },
        NewDescription : (state,action)=>{
            state.description=action.payload
        },
        NewCategory : (state,action)=>{
            state.category=action.payload
        },
        NewPrice : (state,action)=>{
            state.price=action.payload
        },
        NewDiscountPercentage : (state,action)=>{
            state.discountPercentage=action.payload
        },
        NewRating : (state,action)=>{
            state.rating=action.payload
        },
        NewStock : (state,action)=>{
            state.stock=action.payload
        },
        NewWarrantyInformation : (state,action)=>{
            state.warrantyInformation=action.payload
        },
        NewShippingInformation: (state,action)=>{
            state.shippingInformation=action.payload
        },
        NewAvailabilityStatus : (state,action)=>{
            state.availabilityStatus=action.payload
        },
        NewImages : (state,action)=>{
            state.images.pop()
            state.images.push(action.payload)
        },
    }
})

export const {NewTitle,NewDescription,NewCategory,NewPrice,
    NewDiscountPercentage,NewRating,NewStock,
    NewWarrantyInformation,NewShippingInformation,
    NewAvailabilityStatus,NewImages,NewUserId}=Search.actions
export default Search.reducer