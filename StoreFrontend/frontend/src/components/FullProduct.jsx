const API = import.meta.env.VITE_API_BASE;
import { useEffect, useState } from "react";
import api from "../../api/api";

const FullProduct = ({product})=>{
    const token = localStorage.getItem("token");
    const [rating, setRating]=useState(0);

    useEffect(()=>{
        async function get(){
            if(token){
                let rate;
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
        if(token){
            try{
                const values={ProductId:product.id,Rate:value};
                const response = await api.post(`${API}/api/controllers/productRating`, values);
            }
            catch(error){
                console.log(error);
            }
        }
    }

    return(
        <div className="Full-product">
            <div className="image">
                <img src={product.imageURL} alt="" />
            </div>
            <p className="title">{product.name}</p>
                <div className="product-values">
                    <p className="price">{"Цена: "+product.price}</p>
                    <p className="rating">{"Рейтинг: "+product.rating}</p>
                    <div>
                        <button onClick={()=>rate(1)}>{rating>0?(<i class="fa-solid fa-star" style={{color:"#cfcc07"}}></i>):(<i class="fa-regular fa-star"></i>)}</button>
                        <button onClick={()=>rate(2)}>{rating>1?(<i class="fa-solid fa-star" style={{color:"#cfcc07"}}></i>):(<i class="fa-regular fa-star"></i>)}</button>
                        <button onClick={()=>rate(3)}>{rating>2?(<i class="fa-solid fa-star" style={{color:"#cfcc07"}}></i>):(<i class="fa-regular fa-star"></i>)}</button>
                        <button onClick={()=>rate(4)}>{rating>3?(<i class="fa-solid fa-star" style={{color:"#cfcc07"}}></i>):(<i class="fa-regular fa-star"></i>)}</button>
                        <button onClick={()=>rate(5)}>{rating>4?(<i class="fa-solid fa-star" style={{color:"#cfcc07"}}></i>):(<i class="fa-regular fa-star"></i>)}</button>
                     </div>
                </div>
        </div>
    )
}

export default FullProduct;