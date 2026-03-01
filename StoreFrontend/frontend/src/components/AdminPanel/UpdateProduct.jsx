import  { useState } from 'react';
const API = import.meta.env.VITE_API_BASE;
import api from '../../../api/api';

const UpdateProduct = () => {
    const [id,setId]=useState(0);
    const [product,setProduct]=useState({});
    const [error,setError]=useState(null);
    const [loaded,setLoad]=useState(false);

    const  findProduct= async ()=>{
        setError(null);
        try{
            const response= await api.get(`${API}/api/controllers/product/`+id);
            if(response.status==200){
                setProduct(response.data);
                setLoad(true);
            }else{
                console.log(response);     
            }
        }catch(error){
            if(error.data.type==null){
                setError(error.data);
            }
            console.log(error);
        }
        console.log(product)
    };

    const handle=(e)=>{
        if(e.target.value=="true"){
            setProduct({...product, isAvaible: true});
        }
        if(e.target.value=="false"){
            setProduct({...product, isAvaible: false});
        }
        else{
            setProduct({...product, isAvaible: e.target.value});
        }
    }

    const  update= async ()=>{
        try{
            console.log(product);
            await api.put(`${API}/api/controllers/product/`+id, product)
        }
        catch(error){
            console.log(error);
        }
    }

    if(loaded){
        return(
          <div>
            <div>
                <input type="text" placeholder="Название товара" value={product.name} onChange={(e)=>setProduct({...product, name: e.target.value})}/>
            </div>
            <div>
                <input type="text" placeholder="Описание товара" value={product.description} onChange={(e)=>setProduct({...product, description: e.target.value})}/>
            </div>
            <div>
                <input type="text" placeholder="Цена товара" value={product.price} onChange={(e)=>setProduct({...product, price: e.target.value})}/>
            </div>
            <div>
                <input type="text" placeholder="Товар доступен?" value={product.isAvaible} onChange={(e)=>handle(e)}/>
            </div>
            <div>
                <input type="text" placeholder="URL изображения товара" value={product.imageURL} onChange={(e)=>setProduct({...product, imageURL: e.target.value})}/>
            </div>
            <button onClick={update}>update</button>
          </div>  
        );
    }
    return (
        <div>
            <input type="text" label="Id" placeholder='Введите Id товара' value={id} onChange={(e)=>setId(e.target.value)}/>
            <button onClick={findProduct}>Найти</button>
            {error?(<><p>{error}</p></>):(<></>)}
        </div>
    );
}

export default UpdateProduct;
