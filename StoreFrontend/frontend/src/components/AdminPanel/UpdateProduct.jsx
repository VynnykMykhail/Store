import  { useState } from 'react';
const API = import.meta.env.VITE_API_BASE;
import api from '../../../api/api';
import Info from './Info';

const UpdateProduct = () => {
    const [id,setId]=useState(0);
    const [product,setProduct]=useState({});

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

    if(id!=0){
        return(
          <div className='form'>
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
            <button onClick={update}>Обновить</button>
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
