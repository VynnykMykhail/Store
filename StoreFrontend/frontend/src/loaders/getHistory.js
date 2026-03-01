const API = import.meta.env.VITE_API_BASE;
import api from "../../api/api";

export const getProductHistory=async({params})=>{
    const response=await api.get(`${API}/api/controllers/ProductHistory/`+params.id);
    return response.data;
}

export const getUserHistory=async({params})=>{
    const response=await api.get(`${API}/api/controllers/UserHistory/`+params.id);
    return response.data;
}