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
    // extraReducers: {
    //     [getAllProducts.pending]: (state) => {
    //         state.isLoadingProducts = true
    //     },
    //     [getAllProducts.fulfilled]: (state, action) => {
    //         state.productsList = action.payload
    //     },
    //     [getAllProducts.error]: (state, action) => {
    //         console.log(action.payload)
    //     }
    // }
})

export const productsReducer = productSlice.reducer
export const productsActions = productSlice.actions

//         deleteTodo: create.asyncThunk(async (args, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI
//     try {
//         let response = await axios.get(baseURL)
//         console.log(response)
//         return response.data
//     } catch (error) {
//         console.log(error)
//         console.log(rejectWithValue)
//     }
// }, {
//     pending: (state) => {
//         state.isLoadingProducts = true
//     },
//     fulfilled: (state, action) => {
//         state.productsList = action.payload
//     },
//     rejected: (state, action) => {
//         console.log(action)
//     }
// })