import { useState } from "react";
const API = import.meta.env.VITE_API_BASE;
import api from "../../../api/api";

const AddLocation = () => {
    const [shortName,setName]=useState();
    const [location,setLocation]=useState();
    const [message,setMessage]=useState(null);


    const  create= async ()=>{
        setMessage(null);
        try{
            const values={location:location,shortName:shortName};
            const response=await api.post(`${API}/api/controllers/location`, values);
            if(response.status==200){
                setMessage("Операция успешна");
            }
        }
        catch(error){
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
            <input type="text"  placeholder="Введите короткое название" value={shortName} onChange={(e)=>setName(e.target.value)}/>
            <input type="text"  placeholder="Введите полное название" value={location} onChange={(e)=>setLocation(e.target.value)}/>
            <button className="dark-button" onClick={create}>Создать</button>
            {message?(<><p>{message}</p></>):(<></>)}
        </div>
    );
}

export default AddLocation;
