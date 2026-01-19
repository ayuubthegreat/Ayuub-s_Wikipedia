import axios from 'axios';

const handleApiError = (error) => {
    console.log(error);
    if (error.response) {
        return error.response.data;
    } else if (error.request) {
        return { 
            message: 'Cannot connect to server. Please check if the API is running.' 
        };
    } else {
        return { 
            message: error.message || 'An unexpected error occurred' 
        };
    }
};
export const loadingCase = (state) => {
    state.loading = true;
    state.error = null;
};
export const failedCase = (state, action) => {
    state.loading = false;
    state.error = action.payload?.message || 'Operation failed. Please try again.';
}
export const apiCall = async (method, url, data = null, headers = {}) => {
    try {
        const response = await axios({
            method,
            url,
            data,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: handleApiError(error) };
    }
};
