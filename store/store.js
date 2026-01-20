import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth"
import projectsReducer from "./slices/projects"

const store = configureStore({
    reducer: {
        auth: authReducer,
        projects: projectsReducer,
    }
})
export default store;