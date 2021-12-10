import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/v1/";

const getOrders = () => {
    return axios.get(API_URL + 'orders/', { headers: authHeader() });
};

const createOrder = (deliver_info) => {
    return axios.post(API_URL + 'orders/create', deliver_info, { headers: authHeader() });
};

const orderService = {
    getOrders,
    createOrder,
};

export default orderService;