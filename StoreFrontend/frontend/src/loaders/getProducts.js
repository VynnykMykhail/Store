import axios from "axios";
const API = import.meta.env.VITE_API_BASE;

export const getProducts = async ()=>{
    const response = await axios.get(`${API}/api/controllers/products`);
    return response.data;
}

export const getProduct = async ({params})=>{
     const response= await axios.get(`${API}/api/controllers/product/`+params.id);
     
     return response.data;
}