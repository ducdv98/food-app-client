import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./api-url";

const getOrders = () => {
    return axios.get(API_URL + 'orders/', { headers: authHeader() });
};

const getOrderById = (id) => {
    return axios.get(API_URL + 'orders/' + id, { headers: authHeader() });
};

const createOrder = (deliver_info) => {
    return axios.post(API_URL + 'orders/create', deliver_info, { headers: authHeader() });
};

const reorder = (id) => {
    return axios.post(API_URL + 'orders/reorder', { id }, { headers: authHeader() });
};


const orderService = {
    getOrders,
    createOrder,
    getOrderById,
    reorder,
};

export default orderService;