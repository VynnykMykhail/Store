const API = import.meta.env.VITE_API_BASE;
import { useState } from "react";
import api from "../../../api/api";
const UploadImage = () => {
    const [file,setFile]=useState(null);
    const [error,setError]=useState(null);

    const upload=async ()=>{
        setError(null);
        const formData = new FormData();
        formData.append("image", file); 

        try {
            const response = await api.post(`${API}/api/controllers/img`, formData);
            if(response.status==200){
                setError("Операция успешна");
            }
        } catch (error) {
            console.error(error);
            if(error.data.type==null){
                setError(error.data);
            }
            else{
                setError("Ошибка");
            }
        }
    }
    return (
        <div>
            <input  type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])} />
            <button className="dark-button" onClick={upload}>Загрузить</button>
            {error?(<><p>{error}</p></>):(<></>)}
        </div>
    );
}

export default UploadImage;
