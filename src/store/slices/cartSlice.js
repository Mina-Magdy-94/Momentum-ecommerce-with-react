import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    cartList: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productIndex = state.cartList.findIndex(product => product.id === action.payload.id)
            if (productIndex !== -1) {
                state.cartList[productIndex] = action.payload;
            } else {
                state.cartList.push(action.payload)
            }
        },
        removeFromCard: (state, action) => {
            state.cartList = state.cartList.filter(product => {
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