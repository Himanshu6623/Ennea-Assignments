import { configureStore } from "@reduxjs/toolkit";
import Newprod from "./CounterSlice/Newprod"
import Review from "./CounterSlice/Review"
import Updatedvalue from "./CounterSlice/Updatedvalue";
export const store=configureStore({
    reducer :{
        new : Newprod,
        review : Review,
        update : Updatedvalue,
    }
})