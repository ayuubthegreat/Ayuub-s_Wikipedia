

export const projectsSuccessCase = (state, action) => {
    state.loading = false;
    state.error = null;
    state.user = action.payload.data.user;
    console.log("Projects fetched successfully:", action.payload);
    state.projects = action.payload.data.projects;
}
export const objectiveSuccessCase = (state, action) => {
    state.loading = false;
    state.error = null;
    console.log("Objective edited successfully:", action.payload);
    
}