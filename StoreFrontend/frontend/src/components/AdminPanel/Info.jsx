import  { useState } from 'react';
const API = import.meta.env.VITE_API_BASE;
import api from '../../../api/api';
import { useNavigate } from 'react-router';

const Info = ({request,path,temp}) => {
    const [id,setId]=useState(0);
    const [error,setError]=useState(null);
    const navigate=useNavigate();
    const  findProduct= async ()=>{
        setError(null);
        try{
            const response= await api.get(`${API}${request}`+id);
            if(response.status==200){
                navigate(path+id);
            }else{
                console.log(response);     
            }
        }catch(error){
            if(error.data.type==null){
                setError(error.data);
            }
            console.log(error);
        }
            
    };
    return (
        <div className='main'>
            <input type="text" label="Id" placeholder={temp} value={id} onChange={(e)=>setId(e.target.value)}/>
            <button onClick={findProduct}>Найти</button>
            {error?(<><p>{error}</p></>):(<></>)}
        </div>
    );
}

export default Info;
