import { configureStore } from '@reduxjs/toolkit'
import cart from './CounterSlice/CartSlice.js'
import search from './CounterSlice/SearchSlice.js'
import color from './CounterSlice/ColorMode.js'
export const store=configureStore({
    reducer: {
        Cart : cart,
        search: search,
        color : color
    }
})