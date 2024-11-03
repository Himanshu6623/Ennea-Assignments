import { configureStore } from "@reduxjs/toolkit";
import NewProduct from "./CounterSlice/Newproduct"
import Review from "./CounterSlice/Review"
export const store=configureStore({
    reducer :{
        new :NewProduct,
        review : Review
    }
})