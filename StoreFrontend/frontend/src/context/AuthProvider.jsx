import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_BASE;

export const AuthContext=createContext(null);

const AuthProvider = ({children}) => {
    const [userAdmin,setUserAdmin]=useState(localStorage.getItem('userAdmin'));
    const loginRequest=async (values)=>{
        let response;
        try{
            response= await axios.post(`${API}/api/controllers/login`, values);
            const {token, admin}=response.data;
            console.log(token);
            localStorage.setItem('token', token);
            localStorage.setItem('userAdmin', admin);
            return response;
        }catch(error){
            console.log(error.response.data);
            return error.response.data;
        }
        
    }

    const registerRequest=async (values)=>{
        let response;
        try{
            response= await axios.post(`${API}/api/controllers/register`, values);
            const {token, admin}=response.data;
            console.log(token);
            localStorage.setItem('token', token);
            localStorage.setItem('userAdmin', admin);
        }catch(error){
            console.log(error.response.data);
            return(error.response.data);
        }
    }


    return (
        <AuthContext.Provider value={{loginRequest, registerRequest, userAdmin,setUserAdmin}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
