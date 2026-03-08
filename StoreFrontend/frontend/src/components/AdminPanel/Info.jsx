import  { useState } from 'react';
const API = import.meta.env.VITE_API_BASE;
import api from '../../../api/api';
import { useNavigate } from 'react-router';


//Шаблон для поиска Id товара или пользователя
const Info = ({request, type="get",path,temp,text="Найти", returnId, setObj}) => {
    const [id,setId]=useState(0);
    const [message,setMessage]=useState(null);
    const navigate=useNavigate();
    
    const  find= async ()=>{
        setMessage(null);
        try{
            let response;
            if(type=="get"){
                response= await api.get(`${API}${request}`+id);
            }
            if(type=="post"){
                response= await api.post(`${API}${request}`+id);
            }
            if(type=="delete"){
                response= await api.delete(`${API}${request}`+id);
            }
            if(response.status==200){
                setMessage("Операция успешна");
                if(path!=""){
                    navigate(path+id);
                }
                else if(returnId!=null){
                    returnId(id);
                    if(setObj!=null) setObj(response.data);
                }
            }
            else{
                console.log(response);     
            }
        }catch(error){
            console.log(error);
            if(error.data.type==null){
                setMessage(error.data);
            }
            else{
                setMessage("Ошибка");
            }
        }
            
    };
    return (
        <div className='form'>
            <input type="text" label="Id" placeholder={temp} value={id} onChange={(e)=>setId(e.target.value)}/>
            <button className="dark-button" onClick={find}>{text}</button>
            {message?(<><p>{message}</p></>):(<></>)}
        </div>
    );
}

export default Info;
