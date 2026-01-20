import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../BASE_URL.js';
import { WEBSITE_ID } from '../../BASE_URL.js';
import { apiCall, failedCase, loadingCase } from '../utils/apiCall.js';
import { objectiveSuccessCase, projectsSuccessCase } from '../utils/projectsCall.js';


const BASE_URL_PROJECTS = BASE_URL + "/wiki"

export const initialState = {
    user: null,
    projects: [],
    loading: false,
    error: null,
}


export const addProject = createAsyncThunk(
    "/wiki/addProject",
    async ({title, description, tags, objectives, release_date, content}, { rejectWithValue }) => {
        const result = await apiCall(
            'post',
            `${BASE_URL_PROJECTS}/createProject`,
            { title, description, tags, objectives, release_date, content, websiteID: WEBSITE_ID },
            {"Authorization": `Bearer ${localStorage.getItem('token') || ''}`}
        );
        return result.success ? result.data : rejectWithValue(result.error);
    }
)
export const updateProject = createAsyncThunk(
    "/wiki/updateProject",
    async ({id, title, description, tags, release_date, content}, { rejectWithValue }) => {
        const result = await apiCall(
            'post',
            `${BASE_URL_PROJECTS}/updateProject`,
            {projectID: id, title, description, tags, release_date, content},
            {"Authorization": `Bearer ${localStorage.getItem('token') || ''}`}
        );
        return result.success ? result.data : rejectWithValue(result.error);
    }
)
export const deleteProject = createAsyncThunk(
    "/wiki/deleteProject",
    async ({projectID}, { rejectWithValue}) => {
        const result = await apiCall(
            'post',
            `${BASE_URL_PROJECTS}/deleteProject`,
            {projectID, websiteID: WEBSITE_ID},
            {"Authorization": `Bearer ${localStorage.getItem('token') || ''}`}
        );
        return result.success ? result.data : rejectWithValue(result.error);
    }
)
export const fetchAllProjects = createAsyncThunk(
    "/wiki/fetchAllProjects",
    async (__, { rejectWithValue }) => {
        const result = await apiCall(
            'get',
            `${BASE_URL_PROJECTS}/getAllProjects`,
            null,
            {"Authorization": `Bearer ${localStorage.getItem('token') || ''}`}
        );
        return result.success ? result.data : rejectWithValue(result.error);
    }
);
export const editObjective = createAsyncThunk(
    "/wiki/editObjective",
    async ({objectiveID, title, description, completed, projectID}, {rejectWithValue}) => {
        const result = await apiCall(
            'post',
            `${BASE_URL_PROJECTS}/updateObjective`,
            {objectiveID, title, description, completed, projectID},
            {"Authorization": `Bearer ${localStorage.getItem('token') || ''}`}
        );
        return result.success ? result.data : rejectWithValue(result.error);
    }
)

const projects_slice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addProject.pending, loadingCase)
        .addCase(addProject.fulfilled, projectsSuccessCase)
        .addCase(addProject.rejected, failedCase)
        .addCase(updateProject.pending, loadingCase)
        .addCase(updateProject.fulfilled, projectsSuccessCase)
        .addCase(updateProject.rejected, failedCase)
        .addCase(fetchAllProjects.pending, loadingCase)
        .addCase(fetchAllProjects.fulfilled, projectsSuccessCase)
        .addCase(fetchAllProjects.rejected, failedCase)
        .addCase(editObjective.pending, loadingCase)
        .addCase(editObjective.fulfilled, objectiveSuccessCase)
        .addCase(editObjective.rejected, failedCase)
        .addCase(deleteProject.pending, loadingCase)
        .addCase(deleteProject.fulfilled, projectsSuccessCase)
        .addCase(deleteProject.rejected, failedCase)

    }
})
export default projects_slice.reducer;

