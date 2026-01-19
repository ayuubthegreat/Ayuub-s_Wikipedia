export const projectsSuccessCase = (state, action) => {
    state.loading = false;
    state.error = null;
    state.user = action.payload.user;
    state.projects = action.payload.projects;
}