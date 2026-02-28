const API = import.meta.env.VITE_API_BASE;
import api from "../../api/api";

export const getProducts = async ()=>{
    const response = await api.get(`${API}/api/controllers/products`);
    return response.data;
}

export const getProduct = async ({params})=>{
     const response= await api.get(`${API}/api/controllers/product/`+params.id);
     
     return response.data;
}