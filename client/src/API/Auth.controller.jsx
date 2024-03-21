import axios from 'axios';

//forgot password method
export const forgotPwReq = async (email) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
        return response.data;
    } catch (error) {
        return Error(error.response.data.message || 'Something went wrong');
    }
};

//reset password method
export const resetPassword = async (token, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
        return response.data;
    } catch (error) {
        return Error(error.response.data.message || 'Something went wrong');
    }
}