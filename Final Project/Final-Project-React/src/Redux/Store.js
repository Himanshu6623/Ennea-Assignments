import { configureStore } from "@reduxjs/toolkit";
import JwtToken from "./CounterSlice/JwtToken";
import UserDetails from "./CounterSlice/UserDetails";
import ThemeMode  from "./CounterSlice/ThemeMode";
export const store=configureStore({
    reducer :{
        Token : JwtToken,
        Details : UserDetails,
        Theme : ThemeMode,
    }
})