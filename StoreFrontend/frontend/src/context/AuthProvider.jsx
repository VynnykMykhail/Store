import { createContext, useContext, useEffect, useState } from 'react';
const API = import.meta.env.VITE_API_BASE;
import api from '../../api/api';
import { ContractContext } from './ContractProvider';
import {jwtDecode} from 'jwt-decode'
export const AuthContext=createContext(null);

const AuthProvider = ({children}) => {
    const [isAdmin,setAdmin]=useState(false);
    const {setAccount}=useContext(ContractContext);
    const token=localStorage.getItem("token");
    const roleClaim="http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    let decode;
    if(token) decode=jwtDecode(token);

    const loginRequest=async (values)=>{
        let response;
        try{
            response= await api.post(`${API}/api/controllers/login`, values);
            const {token}=response.data;
            console.log(token);
            localStorage.setItem('token', token);
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
            const {token}=response.data;
            console.log(token);
            localStorage.setItem('token', token);
            return response;
        }catch(error){
            console.log(error);
            return(error);
        }
    }

    const logout=()=>{
        localStorage.removeItem('token');
        setAccount("");
        setAdmin(false);
    }

    useEffect(()=>{
        if(decode){
            if(decode?.[roleClaim]=="Admin"||decode?.[roleClaim]=="SuperAdmin") setAdmin(true);
            else{
                setAdmin(false);
            }
        }
    });

    return (
        <AuthContext.Provider value={{loginRequest, registerRequest, logout, isAdmin}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
