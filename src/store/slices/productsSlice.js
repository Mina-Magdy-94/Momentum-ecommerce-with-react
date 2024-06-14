import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../../API/productsApi";


let initialState = {
    productsList: [],
    isLoadingProducts: false,
    errorGettingProducts: null
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoadingProducts = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoadingProducts = false;
                state.productsList = action.payload;
                state.errorGettingProducts = null
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoadingProducts = false;
                state.errorGettingProducts = action.payload.error;
            });
    },

})

export const productsReducer = productSlice.reducer
export const productsActions = productSlice.actions