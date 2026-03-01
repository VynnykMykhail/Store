import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_BASE;
import api from '../../api/api';
export const AuthContext=createContext(null);

const AuthProvider = ({children}) => {
    const [userAdmin,setUserAdmin]=useState(false);
    const loginRequest=async (values)=>{
        let response;
        try{
            response= await api.post(`${API}/api/controllers/login`, values);
            const {token, admin}=response.data;
            console.log(token);
            localStorage.setItem('token', token);
            localStorage.setItem('userAdmin', admin);
            return response;
        }catch(error){
            console.log(error);
            return error;
        }
        
    }

    const registerRequest=async (values)=>{
        let response;
        try{
            response= await api.post(`${API}/api/controllers/register`, values);
            const {token, admin}=response.data;
            console.log(token);
            localStorage.setItem('token', token);
            localStorage.setItem('userAdmin', admin);
            return response;
        }catch(error){
            console.log(error);
            return(error);
        }
    }
    useEffect(()=>{
        const getAdmin=localStorage.getItem("userAdmin");
        if(getAdmin){
            setUserAdmin(JSON.parse(getAdmin));
        }
    });

    return (
        <AuthContext.Provider value={{loginRequest, registerRequest, userAdmin,setUserAdmin}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
