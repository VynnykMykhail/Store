const API = import.meta.env.VITE_API_BASE;
import { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import { AuthContext } from "../context/AuthProvider";

const FullProduct = ({product})=>{
    const token = localStorage.getItem("token");
    const [rating, setRating]=useState(0);
    const [error,setError]=useState(null);
    const{isAdmin}=useContext(AuthContext);
    useEffect(()=>{
        async function get(){
            if(token){
                try{
                    const rate=await api.get(`${API}/api/controllers/userProductRate/`+product.id);
                    setRating(rate.data);
                    
                }catch(error){
                    console.log(error);
                }
            }
        }
        get();
    },[rating]);
    

    const rate=async (value)=>{
        setError(null);
        if(token){
            try{
                const values={ProductId:product.id,Rate:value};
                await api.post(`${API}/api/controllers/productRating`, values);
                window.location.reload()
            }
            catch(error){
                console.log(error);
                if(error.data.type==null){
                setError(error.data);
                }
            }
        }
        else{
            setError("Нужно войти в аккаунт для оценки");
        }
    }

    return(
        <div className="Full-product">
            <div className="image">
                <img src={product.imageURL} alt="" />
            </div>
            {isAdmin?(<><p>Id: {product.id}</p></>):(<></>)}
            <p className="title">{product.name}</p>
            {product.category?(<><p>Категория: {product.category}</p></>):(<></>)}
                <div className="product-values">
                    <p className="price">{"Цена: "+product.price} Wei</p>
                    <p className="rating">{"Рейтинг: "+product.rating}</p>
                    <div className="stars">
                        <button onClick={()=>rate(1)}>{rating>0?(<i class="fa-solid fa-star" style={{color:"#fffb01"}}></i>):(<i class="fa-regular fa-star"></i>)}</button>
                        <button onClick={()=>rate(2)}>{rating>1?(<i class="fa-solid fa-star" style={{color:"#fffb01"}}></i>):(<i class="fa-regular fa-star"></i>)}</button>
                        <button onClick={()=>rate(3)}>{rating>2?(<i class="fa-solid fa-star" style={{color:"#fffb01"}}></i>):(<i class="fa-regular fa-star"></i>)}</button>
                        <button onClick={()=>rate(4)}>{rating>3?(<i class="fa-solid fa-star" style={{color:"#fffb01"}}></i>):(<i class="fa-regular fa-star"></i>)}</button>
                        <button onClick={()=>rate(5)}>{rating>4?(<i class="fa-solid fa-star" style={{color:"#fffb01"}}></i>):(<i class="fa-regular fa-star"></i>)}</button>
                     </div>
                     {error?(<><p>{error}</p></>):(<></>)}
                </div>
        </div>
    )
}

export default FullProduct;