import axios from 'axios';
import { BASE_URL } from '../../utils/url';
import { getUser } from '../../utils/getUser';

const token = getUser();

export const loginAPI = async({email, password}) => {
    const response = await axios.post(`${BASE_URL}/users/login`,{
        email,
        password
    });
    return response.data;
};

export const registerAPI = async({username, email, password}) => {
    const response = await axios.post(`${BASE_URL}/users/register`,{
        username,
        email,
        password
    });
    return response.data;
};

export const changePasswordAPI = async (newPassword) => {
    const response = await axios.put(`${BASE_URL}/users/change-password`, {
        newPassword
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const updateProfileAPI = async ({email, username}) => {
    const response = await axios.put(`${BASE_URL}/users/update-profile`, {
        email,
        username
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const profileAPI = async() => {
    const response = await axios.get(`${BASE_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

