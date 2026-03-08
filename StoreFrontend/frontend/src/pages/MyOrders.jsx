import { useLoaderData } from 'react-router';
const API = import.meta.env.VITE_API_BASE;
import api from "../../api/api";
import { useEffect, useState } from 'react';

const MyOrders = () => {
    const [products,setProducts]=useState();
    const orders=useLoaderData();

    useEffect(()=>{
        const getProd=async()=>{
            try{
                const response=orders.history.map((item)=>api.get(`${API}/api/controllers/product/`+item.productId).then(res=>res.data));
                const results = await Promise.all(response);
                setProducts(results);
            }
            catch(error){
                console.log(error)
            }
        }
        getProd();
    },[orders]);

    if(products==null){
        return(
            <div className="main">
                <h3>Загрузка</h3>
            </div>
        )
    }
    else if(orders==null||orders.order.length==0){
        return(
            <div className="main">
                <h3>Нет заказов</h3>
            </div>
        )
    }
    return (
        <div className='main'>
            {orders.order.map((order)=>{
                const purchaseHistory=orders.history.filter(h=>h.orderId==order.id);
                return(
                <div className="order" key={order.id}>
                    <h4>Заказ: {order.id}</h4>
                    <div style={{display:"flex", flexWrap:"wrap", gap:"10px"}}>
                        {purchaseHistory.map((item)=>{
                        const product=products.find(p=>p.id==item.productId);
                        return(
                            <div className="order-item" key={item.id}>
                                <img src={product.imageURL} alt="" />
                                <p>{product.name}</p>
                                <p>Количество: {item.count}</p>
                            </div>);
                        })}
                    </div>
                        <h4>Сделан: {order.date}</h4>
                        <h4>Оплата: {order.amount}</h4>
                        <h4>Статус: {order.status}</h4>
                </div>);
            })}
            
        </div>
    );
}

export default MyOrders;
