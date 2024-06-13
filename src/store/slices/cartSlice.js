import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    cartList: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartList.push(action.payload)
        },
        removeFromCard: (state, action) => {
            state.cartList = state.cartList.filter((product) => {
                return product.id !== action.payload
            })
        },
        // checkProductInCart: (state, action) => {
        //     console.log(action.payload)
        //     let productExist = !!state.cartList.find((product) => product.id === action.payload)
        //     return productExist
        // }
    }
})

export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions