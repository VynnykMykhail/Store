const API = import.meta.env.VITE_API_BASE;
import api from "../../api/api";

export const getProfile=async () =>{
    const response = await api.get(`${API}/api/controllers/profile`);
    return response.data;
}

export const getUsers=async () =>{
    const response = await api.get(`${API}/api/controllers/users`);
    return response.data;
}

export const getUser=async ({params}) =>{
    const response = await api.get(`${API}/api/controllers/users`+params.id);
    return response.data;
}