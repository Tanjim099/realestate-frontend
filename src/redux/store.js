import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import authSlice from "./slices/authSlice";
import projectSlice from "./slices/projectSlice";
import blogSlice from "./slices/blogSlice";
import statSlice from './slices/statSlice';
import contactSlice from './slices/contactSlice';
import axiosInstance from '../helper/axiosInstance';
import toast from 'react-hot-toast';
import visitorSlice from './slices/visitorSlice';


export const createContact = createAsyncThunk('/contact/create', async (data) => {
    try {
        const res = axiosInstance.post('/contact', data);

        toast.promise(res, {
            loading: 'Waiting!',
            success: 'Successfully',
            error: 'Failed',
        });

        return (await res)?.data;

    } catch (Error) {
        toast.error(Error.message)
    }
})

const store = configureStore({
    reducer: {
        auth: authSlice,
        project: projectSlice,
        blog: blogSlice,
        stat: statSlice,
        contact: contactSlice,
        visitor: visitorSlice
    },
    devTools: true
});

export default store