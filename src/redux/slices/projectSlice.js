import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helper/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    projects: [],
    projectByPage: [],
    editProject: false,
    project: null,
    query: "",
    results: [],
    suggestions: [],
    status: "idle",
    error: null,
    similarProject: [],
}

export const createNewProject = createAsyncThunk("/project/create", async (data) => {
    try {
        const res = axiosInstance.post('project/create/', data);
        toast.promise(res, {
            loading: 'Creating New Project',
            success: 'Project Created Successfully',
            error: 'Failed to create project'
        });

        return (await res).data;

    } catch (Error) {
        toast.error(Error.message);
        throw Error;
    }
});

export const updateProject = createAsyncThunk('', async (data) => {
    try {
        const res = axiosInstance.put(`/project/update/${data[1]}`, data[0]);

        toast.promise(res, {
            loading: 'Updating Project',
            success: 'Project Updating Successfully',
            error: 'Failed to Updating project'
        });

        return (await res).data;
    } catch (Error) {
        toast.error(Error.message);
        throw Error;
    }
})

export const getAllProjects = createAsyncThunk("/project/getall", async () => {
    try {
        const res = axiosInstance.get("project/getall");
        return (await res).data
    } catch (error) {
        toast.error(Error.message);
        throw Error;
    }
})

export const getAllProjectsByPage = createAsyncThunk("/project/get-all", async (data) => {
    try {
        const res = axiosInstance.get(`project/get-all/projets?page=${data.page}&limit=${data.limit}`);
        return (await res).data
    } catch (error) {
        toast.error(Error.message);
        throw Error;
    }
})

export const getProject = createAsyncThunk("/project/getProject", async (pId) => {
    try {
        const res = axiosInstance.get(`project/get/${pId}`);
        return (await res)?.data;
    } catch (Error) {
        toast.error(Error.message)
    }
});


export const deleteProject = createAsyncThunk("/project/deleteProject", async (pId) => {
    try {
        const res = axiosInstance.delete(`project/delete/${pId}`);
        toast.promise(res, {
            loading: "Waiting",
            success: "Successfully",
            error: "Failed"
        });
        return (await res).data
    } catch (error) {
        toast.error(Error);
        throw Error;
    }
})

export const searchProject = createAsyncThunk("/project/search", async (query) => {
    try {
        const res = axiosInstance.get("project/search/project", {
            params: { query },
        });

        return (await res)?.data;
    } catch (Error) {
        toast.error(Error.message)
    }
});

export const getSuggestions = createAsyncThunk("/project/suggestions", async (query) => {
    try {
        const res = axiosInstance.get("project/suggestions", {
            params: { query },
        })
        return (await res)?.data;
    } catch (error) {
    }
})


export const getSimilarProject = createAsyncThunk("/project/get-similar", async (data) => {
    try {
        const res = axiosInstance.get(`project/similar/${data[0]}/${data[1]}`);
        return (await res)?.data;
    } catch (error) {
        toast.error(error.message)
    }
})

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setEditProject: (state, action) => {
            state.editProject = action?.payload;
        },
        setProject: (state, action) => {
            state.project = action?.payload;
        },
        setQuery: (state, action) => {
            state.query = action?.payload;
        },
    },
    extraReducers: (builder) => {

        builder.addCase(createNewProject.rejected, (state, action) => {
            toast.error('Failed to create project');
        });
        builder.addCase(getAllProjects.fulfilled, (state, action) => {
            state.projects = action?.payload.data
        });
        builder.addCase(getAllProjectsByPage.fulfilled, (state, action) => {
            state.projectByPage = action?.payload?.data
        });
        builder.addCase(searchProject.fulfilled, (state, action) => {
            state.status = "Succeeded",
                state.results = action.payload;
        });
        builder.addCase(getSuggestions.fulfilled, (state, action) => {
            state.suggestions = action.payload;
        });
        builder.addCase(getSimilarProject.fulfilled, (state, action) => {
        })
    }
})

export const { setEditProject, setProject, setQuery } = projectSlice.actions;

export default projectSlice.reducer;