const API = import.meta.env.VITE_API_BASE;
import api from "../../api/api";

export const getCategories=async()=>{
    const response=await api.get(`${API}/api/controllers/categories`);
    return response.data;
}