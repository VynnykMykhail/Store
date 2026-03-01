import  { useState } from 'react';
const API = import.meta.env.VITE_API_BASE;
import api from '../../../api/api';

const DeleteProduct = () => {
    const [id,setId]=useState(0);
    const [error,setError]=useState(null);
    const deleteProduct=async()=>{
        setError(null);
        try{
            await api.delete(`${API}/api/controllers/product/`+id);
        }catch(error){
            console.log(error);
            if(error.data.type==null){
                setError(error.data);
            }
        }
    }
    return (
        <div>
           <input type="text" label="Id" placeholder='Введите Id товара' value={id} onChange={(e)=>setId(e.target.value)}/>
            <button onClick={deleteProduct}>Удалить</button>
            {error?(<><p>{error}</p></>):(<></>)} 
        </div>
    );
}

export default DeleteProduct;
