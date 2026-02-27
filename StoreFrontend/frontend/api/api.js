import axios from "axios";
const API = import.meta.env.VITE_API_BASE;
export const api = axios.create({
    baseURL: API
});

// додавання токен до кожного запиту
api.interceptors.request.use(async config => {
    const token = await localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}
)


api.interceptors.response.use(
    response => response,
    error => {
        console.log(error);
        return Promise.reject(error.response)
    }
)

export default api;