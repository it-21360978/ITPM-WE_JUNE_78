import axios from 'axios';

//register method
export const register = async (firstName,lastName,email,password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', { firstName,lastName,email,password });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
    }
}


//login method
export const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
    }
}

//logout method
export const logout = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/auth/logout');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
    }
}



//forgot password method
export const forgotPwReq = async (email) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
    }
};

//reset password method
export const resetPassword = async (token, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
    }
}