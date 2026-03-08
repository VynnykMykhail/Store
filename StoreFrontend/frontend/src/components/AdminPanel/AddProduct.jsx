import { useEffect, useState } from "react";
const API = import.meta.env.VITE_API_BASE;
import api from "../../../api/api";

const AddProduct = () => {
    const [product,setProduct]=useState({Name:"", Description:"",Price:0,IsAvaible:true,Category:"",ImageURL:""});
    const [error,setError]=useState(null);
    const [categories,setCategories]=useState(null);


    useEffect(()=>{
        const getCategory=async()=>{
            try{
                const response=await api.get(`${API}/api/controllers/categories`);
                setCategories(response.data);
            }
            catch(error){
                console.log(error)
            }
        }
        getCategory();
    },[]);

    const handleCategory=(e)=>{
        setProduct({...product, Category:e.target.value});
    }

    const handle=(e)=>{
        if(e.target.value=="true"){
            setProduct({...product, IsAvaible: true});
        }
        else{
            setProduct({...product,IsAvaible:false});
        }
    }

    const add=async()=>{
        setError(null);
        try{
            const response=await api.post(`${API}/api/controllers/product`, product);
            if(response.status==200){
                setError("Операция успешна");
            }
        }
        catch(error){
            console.log(error);
            if(error.data.type==null){
                setError(error.data);
            }
            else{
                setError("Ошибка");
            }
        }
    }
    if(categories==null){
        return(
            <div className="main">
                <h3>Загрузка</h3>
            </div>
        )
    }

    return (
        <div className="form">
            <div>
                <input type="text" placeholder="Название товара" value={product.Name} onChange={(e)=>setProduct({...product, Name: e.target.value})}/>
            </div>
            <div>
                <p >{product.Description.length}/700</p>
                <input type="text" placeholder="Описание товара" value={product.Description} onChange={(e)=>setProduct({...product, Description: e.target.value})}/>
            </div>
            <div>
                <input type="text" placeholder="Цена товара" value={product.Price} onChange={(e)=>setProduct({...product, Price: e.target.value})}/>
            </div>
            <div>
                <select id="select-avaible" value={product.isAvaible} onChange={(e)=>handle(e)}>
                    <option value={true}>Доступен</option>
                    <option value={false}>Недоступен</option>
                </select>
            </div>
            <div>
                <select id="categories" value={product.categories} onChange={(e)=>handleCategory(e)}>
                    <option value={null}>Без категории</option>
                    {categories.map((item)=>(
                            <option key={item.id} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <input type="text" placeholder="URL изображения товара" value={product.ImageURL} onChange={(e)=>setProduct({...product, ImageURL: e.target.value})}/>
            </div>
            <button className="dark-button" onClick={add}>Добавить</button>
            {error?(<><p>{error}</p></>):(<></>)}
        </div>
    );
}

export default AddProduct;
