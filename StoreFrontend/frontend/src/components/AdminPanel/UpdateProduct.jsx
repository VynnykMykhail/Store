import  { useEffect, useState } from 'react';
const API = import.meta.env.VITE_API_BASE;
import api from '../../../api/api';
import Info from './Info';

const UpdateProduct = () => {
    const [id,setId]=useState(0);
    const [product,setProduct]=useState({});
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
        console.log(product);
    }

    const handle=(e)=>{
        if(e.target.value=="true"){
            setProduct({...product, isAvaible: true});
        }
        else{
            setProduct({...product,isAvaible:false});
        }
    }

    const  update= async ()=>{
        setError(null);
        try{
            console.log(product);
            const response=await api.put(`${API}/api/controllers/product/`+id, product);
            if(response.status==200){
                setError("Операция успешна");
            }
        }
        catch(error){
            console.log(error);
            setError("Ошибка");
        }
    }

    if(id!=0){
        return(
          <div className='form'>
            <div>
                <input type="text" placeholder="Название товара" value={product.name} onChange={(e)=>setProduct({...product, name: e.target.value})}/>
            </div>
            <div>
                <p >{product.Description.length}/700</p>
                <input type="text" placeholder="Описание товара" value={product.description} onChange={(e)=>setProduct({...product, description: e.target.value})}/>
            </div>
            <div>
                <input type="text" placeholder="Цена товара" value={product.price} onChange={(e)=>setProduct({...product, price: e.target.value})}/>
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
                <input type="text" placeholder="URL изображения товара" value={product.imageURL} onChange={(e)=>setProduct({...product, imageURL: e.target.value})}/>
            </div>
            <button className="dark-button" onClick={update}>Обновить</button>
            {error?(<><p>{error}</p></>):(<></>)}
          </div>  
        );
    }
    return (
        <div>
            <Info request="/api/controllers/product/" path="" temp="Введите Id товара" returnId={setId} setObj={setProduct}/>
        </div>
    );
}

export default UpdateProduct;
