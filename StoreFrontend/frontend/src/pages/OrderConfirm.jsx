import { useContext, useState } from "react";
import { CartContext } from "../context/CartProvider";
import { ContractContext } from "../context/ContractProvider";
import { useLoaderData, useNavigate } from "react-router";
const API = import.meta.env.VITE_API_BASE;
import api from "../../api/api";

const OrderConfirm = () => {
    const locations=useLoaderData();
    const {cart,totalCount,totalValue, ClearCart}=useContext(CartContext);
    const {account,connect, deposit}=useContext(ContractContext);
    const [location,setLocation]=useState(locations[0].location);
    const [usingNumber,setUsing]=useState(false);
    const [number,setNumber]=useState("");
    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(false);
    const token = localStorage.getItem('token')

    const navigate=useNavigate();
    
    const handleClick=async ()=>{
        setError(null);
        setDisabled(true);
        try{
            let response;
            if(usingNumber||!token){
                response=await api.get(`${API}/api/controllers/blockedNumberCheck/`+number);
                
            }
            else{
                response=await api.get(`${API}/api/controllers/blockedCheck`);
            }
            console.log(response);
            if(response.status!=200||response.data==true){
                alert("Что-то пошло не так");
            }
            else{
                const success=await deposit(totalValue);
                if(success){
                    alert("Оплата успешна");
                    await createInfo();
                    ClearCart();
                    navigate("/products");
                }
                else{
                    throw new Error;
                }
            }
            
        }
        catch(error){
            console.log(error);
            if(error.data.type!=null){
                setError(error.data);
            }
            alert("Что-то пошло не так");
        }
        setDisabled(false);
    }
    const getNumber=async()=>{
        try{
            const response=await api.get(`${API}/api/controllers/ownNumber`);
            setNumber(response.data)
        }
        catch(error){
            console.log(error)
        }
    }

    const createInfo=async ()=>{
        try{
            const array=cart.map((item)=>{
                const {id,price,count}=item;
                return{productId:id,count:count,payment:price*count};
            });
            const values={Address:account,Location:location,UsingNumber:usingNumber?true:false,PhoneNumber:number,PurchaseHistory: array};
            await api.post(`${API}/api/controllers/PurchaseHistory`, values);
            return true;
        }catch(error){
            console.log(error);
            if(error.data.type==null){
                setError(error.data);
            }
            else{
                setError("Ошибка");
            }
            return false;
        }
    }
    if(cart.length==0){
        return(
            <div className="main">
                <h3>Добавьте товары в тележку</h3>
            </div>
        )
    }
    return (
        <div className="main">
            <h3>Товары к заказу</h3>
            <div style={{display:"flex", flexWrap:"wrap"}}>
                {cart.map((product)=>(
                    <div className="cart-product" key={product.id} style={{maxWidth:"200px"}}>
                        <div className="display-flex">
                            <div className="image">
                                <img src={product.image} alt="" />
                            </div>
                        </div>
                        <div className="cart-values">
                            <p className="title">{product.name}</p>
                            <div>
                                <p>Количество: {product.count}</p>
                                <p>Общая стоимость: {product.price*product.count}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <p>Всего товаров: {totalCount}</p>
            <p>Всего к оплате: {totalValue}</p>
            {token?(<>{usingNumber?(<>
                    <input className="dark-button" type="text" placeholder="Номер телефона" value={number} onChange={(e)=>setNumber(e.target.value)}/>
                    <button onClick={()=>setUsing(false)} className="dark-button">Заказ с помощью аккаунта</button>
                </>):
                (<><button onClick={()=>{getNumber();setUsing(true);}} className="dark-button">Заказ с помощью номера телефона</button></>)
            }</>):(<>{()=>setUsing(true)}<input className="dark-button" type="text" placeholder="Номер телефона" value={number} onChange={(e)=>setNumber(e.target.value)}/></>)}
            
            
            {account?(<>
                <div>
                    <p>Адрес кошелька: {account}</p>
                    <button className="dark-button" onClick={connect}>Переподключить</button>
                    <button className="dark-button" disabled={disabled} onClick={handleClick}>Оплатить</button>
                </div>
            </>):(
                <>
                    <div>
                        <button className="dark-button" onClick={connect}>Подключить кошелёк</button>
                    </div>
                </>
            )}
            <p>Способ доставки</p>
            <select className="dark-button" id="location" onChange={(e)=>setLocation(e.target.value)}>
                    {locations.map((item)=>(
                            <option key={item.id} value={item.location}>{item.location}</option>
                    ))}
            </select>
            {error?(<><p>{error}</p></>):(<></>)}
        </div>
    );
}

export default OrderConfirm;
