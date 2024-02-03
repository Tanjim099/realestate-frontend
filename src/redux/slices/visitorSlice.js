import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    visits: []
}


export const logVisitorAsync = createAsyncThunk("visitor/logvisit", async (visitData) => {
    try {
        const res = axiosInstance.post("/visitor/log-visit", visitData);
        toast.promise(res, {
            success: "Successfully",
            loading: "Wait!",
            error: "Failed"
        });
        return (await res).data
    } catch (error) {
        toast.error(error.message);
    }
})

const visitorSlice = createSlice({
    name: "visitor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(logVisitorAsync.fulfilled, (state, action) => {
            console.log(action)
        })
    }
});
export default visitorSlice.reducer;