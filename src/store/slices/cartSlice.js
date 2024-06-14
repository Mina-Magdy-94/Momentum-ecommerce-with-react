import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState = {
    cartList: []
}

export const decreaseProductCountByOneThunk = createAsyncThunk(
    'cart/decreaseProductCountByOneThunk',
    (productId, { dispatch, getState }) => {
        const state = getState();
        const productIndex = state.cart.cartList.findIndex((product) => product.id === productId);

        if (state.cart.cartList[productIndex].count > 1) {
            dispatch(cartActions.decreaseProductCountByOneSuccess(productId));
        } else {
            dispatch(cartActions.removeFromCard(productId));
        }
    }
);



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productIndex = state.cartList.findIndex(product => product.id === action.payload.id)
            if (productIndex !== -1) {
                const prevCount = state.cartList[productIndex].count;
                state.cartList[productIndex] = {
                    ...action.payload,
                    count: prevCount ? prevCount + action.payload.count : action.payload.count
                };
            } else {
                state.cartList.push(action.payload)
            }
        },
        removeFromCard: (state, action) => {
            state.cartList = state.cartList.filter(product => {
                return product.id !== action.payload
            })
        },
        increaseProductCountByOne: (state, action) => {
            const productIndex = state.cartList.findIndex((product) => product.id === action.payload)

            state.cartList[productIndex] = {
                ...state.cartList[productIndex],
                count: state.cartList[productIndex].count + 1
            }
        },
        // decreaseProductCountByOne: (state, action) => {
        //     const productIndex = state.cartList.findIndex((product) => product.id === action.payload)
        //     if(state.cartList[productIndex].count>1){
        //         state.cartList[productIndex] = {
        //             ...state.cartList[productIndex],
        //             count: state.cartList[productIndex].count - 1
        //         }
        //     }else{

        //     }
        decreaseProductCountByOneSuccess: (state, action) => {
            const productIndex = state.cartList.findIndex((product) => product.id === action.payload);
            if (state.cartList[productIndex].count > 1) {
                state.cartList[productIndex] = {
                    ...state.cartList[productIndex],
                    count: state.cartList[productIndex].count - 1
                };
            }
        }


        // checkProductInCart: (state, action) => {
        //     console.log(action.payload)
        //     let productExist = !!state.cartList.find((product) => product.id === action.payload)
        //     return productExist
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(decreaseProductCountByOneThunk.fulfilled, (state, action) => {
                // This is needed if you want to handle any additional logic after the thunk is completed
            });
    }
})

export const cartReducer = cartSlice.reducer
export const cartActions = cartSlice.actions