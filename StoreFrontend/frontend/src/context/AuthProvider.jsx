import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_BASE;

export const AuthContext=createContext(null);

const AuthProvider = ({children}) => {
    const loginRequest=async (values)=>{
        console.log(values);
        try{
            const response= await axios.post(`${API}/api/controllers/login`, values);
            const {token}=response.data;
            console.log(token);
            localStorage.setItem('token', token);
        }catch(error){
            console.log(error);
        }
    }
    return (
        <AuthContext.Provider value={{loginRequest}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
