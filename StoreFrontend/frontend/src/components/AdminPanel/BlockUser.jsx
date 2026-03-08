import { useState } from "react";
const API = import.meta.env.VITE_API_BASE;
import api from '../../../api/api';

const BlockUser = ({request, type="get", text}) => {
    const [id,setId]=useState(0);
    const [number,setNumber]=useState("");
    const [message,setMessage]=useState(null);
    const [blockNumber,setBlock]=useState(false);
    
    const handleClick=()=>{
        blockNumber?setBlock(false):setBlock(true);
    }

    const block=async ()=>{
        setMessage(null);
        try{
            const values={UserId:blockNumber?null:id,PhoneNumber:blockNumber?number:null}
            let response;
            if(type=="get"){
                response= await api.get(`${API}${request}`,values);
            }
            if(type=="post"){
                response= await api.post(`${API}${request}`,values);
            }
            if(type=="delete"){
                if(blockNumber){
                    response= await api.delete(`${API}/api/controllers/unblockNumber/`+number);
                }
                else{
                    response= await api.delete(`${API}/api/controllers/unblockUser/`+id);
                }
            }
            if(response.status==200){
                setMessage("Операция успешна");
            }
        }
        catch (error){
            console.log(error);
            if(error.data.type==null){
                setMessage(error.data);
            }
            else{
                setMessage("Ошибка");
            }
        }
    }

    return (
        <div className='form'>
            {blockNumber?(<>
                <input type="text" label="Number" placeholder="Введите номер телефона" value={number} onChange={(e)=>setNumber(e.target.value)}/>
                <button className="dark-button" onClick={handleClick}>{text} по Id</button>
            </>):
            (<>
                <input type="text" label="Id" placeholder="Введите Id пользователя" value={id} onChange={(e)=>setId(e.target.value)}/>
                <button className="dark-button" onClick={handleClick}>{text} по номеру телефона</button>
            </>)}
            
            <button className="dark-button" onClick={block}>{text}</button>
            {message?(<><p>{message}</p></>):(<></>)}
        </div>
    );
}

export default BlockUser;
