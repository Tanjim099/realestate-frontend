import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {

}

export const createRatingReview = createAsyncThunk('/rating/create', async (data) => {
    try {
        const res = axiosInstance.post(`rating/create/${data[1]}`, data[0]);
        toast.promise(res, {
            loading: 'Waiting...',
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed...",
        });

        return (await res)?.data;

    } catch (error) {
        toast.error(error.message)
    }
})

const reviewRatingSlice = createSlice({
    name: 'reviewRating',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
});


export default reviewRatingSlice.reducer;