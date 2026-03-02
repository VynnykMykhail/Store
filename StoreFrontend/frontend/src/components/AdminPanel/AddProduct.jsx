import { useState } from "react";
const API = import.meta.env.VITE_API_BASE;
import api from '../../../api/api';

const AddProduct = () => {
    const [product,setProduct]=useState({Name:"", Description:"",Price:0,IsAvaible:false,ImageURL:""});
    const [error,setError]=useState(null);

    const add=async()=>{
        setError(null);
        try{
            await api.post(`${API}/api/controllers/product`, product);
        }
        catch(error){
            console.log(error);
            if(error.data.type==null){
                setError(error.data);
            }
        }
    }

    return (
        <div className="form">
            <div>
                <input type="text" placeholder="Название товара" value={product.Name} onChange={(e)=>setProduct({...product, Name: e.target.value})}/>
            </div>
            <div>
                <input type="text" placeholder="Описание товара" value={product.Description} onChange={(e)=>setProduct({...product, Description: e.target.value})}/>
            </div>
            <div>
                <input type="text" placeholder="Цена товара" value={product.Price} onChange={(e)=>setProduct({...product, Price: e.target.value})}/>
            </div>
            <div>
                <input type="text" placeholder="Товар доступен?" value={product.IsAvaible} onChange={(e)=>setProduct({...product, IsAvaible: e.target.value})}/>
            </div>
            <div>
                <input type="text" placeholder="URL изображения товара" value={product.ImageURL} onChange={(e)=>setProduct({...product, ImageURL: e.target.value})}/>
            </div>
            <button onClick={add}>Добавить</button>
            {error?(<><p>{error}</p></>):(<></>)}
        </div>
    );
}

export default AddProduct;
