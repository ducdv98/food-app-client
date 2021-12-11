import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./api-url";

const getCart = () => {
    return axios.get(API_URL + 'cart/', { headers: authHeader() });
};

const updateCart = (item) => {
    return axios.post(API_URL + 'cart/update', item, { headers: authHeader() });
};

const getDeliveryInfo = () => {
    return axios.get(API_URL + 'orders/latest/deli-info', { headers: authHeader() });
};

const cartService = {
    getCart,
    updateCart,
    getDeliveryInfo,
};

export default cartService;