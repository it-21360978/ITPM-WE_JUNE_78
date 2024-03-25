import axios from 'axios';

const BASEURL ='http://localhost:3030/api';

//register method
export const register = async (firstName,lastName,email,password) => {
    try {
        const response = await axios.post(`${BASEURL}/register`, { firstName,lastName,email,password });
        return response.data;
    } catch (error) {
        // throw new Error(error.response.data.message || 'Something went wrong');
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Something went wrong');
        }
    }
}


//login method
export const signIn = async (email, password) => {
    try {
        const response = await axios.post(`${BASEURL}/login`, { email, password });
        return response.data;
    } catch (error) {
        // throw new Error(error.response.data.message || 'Something went wrong');
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Something went wrong');
        }
    }
}

//logout method
export const logout = async () => {
    try {
        const response = await axios.get(`${BASEURL}/logout`);
        return response.data;
    } catch (error) {
        // throw new Error(error.response.data.message || 'Something went wrong');
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Something went wrong');
        }
    }
}



//forgot password method
export const forgotPwReq = async (email) => {
    try {
        const response = await axios.post(`${BASEURL}/forgot`, { email });
        return response.data;
    } catch (error) {
        // throw new Error(error.response.data.message || 'Something went wrong');
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Something went wrong');
        }
    }
};

//reset password method
export const resetPassword = async (token, password) => {
    try {
        const response = await axios.post(`${BASEURL}/reset/${token}`, { password });
        return response.data;
    } catch (error) {
        // throw new Error(error.response.data.message || 'Something went wrong');
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Something went wrong');
        }
    }
}
