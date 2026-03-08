const API = import.meta.env.VITE_API_BASE;
import api from "../../api/api";

export const getLocations = async ()=>{
    const response = await api.get(`${API}/api/controllers/locations`);
    return response.data;
}
