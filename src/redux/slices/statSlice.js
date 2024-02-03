import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    users: [],
    usersCount: 0,
    blogs: [],
    leads: [],
    checkedItems: {},
}

export const getUsers = createAsyncThunk("/stat/get", async (data) => {
    try {
        const res = axiosInstance.get(`/admin/stat/users?page=${data.page}&limit=${data.limit}`);
        toast.promise(res, {
            loading: "Waiting",
            success: "Successfully",
            error: "Failed"
        })
        return (await res).data
    } catch (error) {
        toast.error(error.message)
    }
})

export const deleteUser = createAsyncThunk("/stat/delete", async (id) => {
    try {
        const res = axiosInstance.delete(`/admin/stat/user/${id}`);
        toast.promise(res, {
            loading: "Waiting",
            success: "Successfully",
            error: "Failed"
        })
        return (await res).data
    } catch (error) {
        toast.error(error.message)
    }
});

export const getBlogs = createAsyncThunk("/stat/getblogs", async (data) => {
    try {
        const res = axiosInstance.get(`/admin/stat/blogs?page=${data.page}&limit=${data.limit}`);
        toast.promise(res, {
            loading: "Waiting",
            success: "Successfully",
            error: "Failed"
        })
        return (await res).data
    } catch (error) {
        toast.error(error.message)
    }
})

export const getAllContact = createAsyncThunk("/stat/getallcontact", async (data) => {
    try {
        const res = axiosInstance.get(`/admin/stat/contacts?page=${data.page}&limit=${data.limit}`);
        toast.promise(res, {
            loading: "Waiting",
            success: "Successfully",
            error: "Failed"
        })
        return (await res).data
    } catch (error) {
        toast.error(error.message)
    }
})
const statSlice = createSlice({
    name: "stat",
    initialState,
    reducers: {
        updateCheckedItems: (state, action) => {
            const { leadId } = action.payload;
            state.checkedItems = {
                ...state.checkedItems,
                [leadId]: !state.checkedItems[leadId],
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action?.payload?.users;
                state.usersCount = action?.payload?.totalUsers;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.blogs = action?.payload?.data
            })
            .addCase(getAllContact.fulfilled, (state, action) => {
                state.leads = action?.payload?.data
            })
    }
});

export const { updateCheckedItems } = statSlice.actions

export default statSlice.reducer;