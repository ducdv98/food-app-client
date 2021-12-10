import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/v1/";

const getCart = () => {
    return axios.get(API_URL + 'cart/', { headers: authHeader() });
};

const updateCart = (item) => {
    return axios.post(API_URL + 'cart/update', item, { headers: authHeader() });
};

const cartService = {
    getCart,
    updateCart,
};

export default cartService;