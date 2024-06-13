import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let baseURL = "https://fakestoreapi.com/products"

export const getAllProducts = createAsyncThunk("products", async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        let response = await axios.get(baseURL)
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
        console.log(rejectWithValue)
    }
})