import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./api-url";


const register = (name, phone_number, password) => {
    return axios.post(API_URL + 'users/', {
        name,
        phone_number,
        password,
    });
};

const login = (phone_number, password) => {
    return axios
        .post(API_URL + 'users/login', {
            phone_number,
            password,
        });
};

const logout = () => {
    return axios.post(API_URL + 'users/logoutall', {}, { headers: authHeader() });
};

const authService = {
    register,
    login,
    logout,
};

export default authService;