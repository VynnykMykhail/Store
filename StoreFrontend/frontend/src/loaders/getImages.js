const API = import.meta.env.VITE_API_BASE;
import api from "../../api/api";

export const getImages = async ()=>{
    const response = await api.get(`${API}/api/controllers/images`);
    return response.data;
}
