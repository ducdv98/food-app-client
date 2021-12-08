import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/v1/";

const getDishes = () => {
    return axios.get(API_URL + 'dishes/', { headers: authHeader() });
};

const getDishById = (id) => {
    return axios.get(API_URL + 'dishes/' + id, { headers: authHeader() });
};

const getCategories = () => {
    return axios.get(API_URL + 'categories/', { headers: authHeader() });
};

const dishService = {
    getDishes,
    getDishById,
    getCategories,
};

export default dishService;