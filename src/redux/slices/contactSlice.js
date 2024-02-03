import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contacts: [],
}


const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {

    }
})

export default contactSlice.reducer;