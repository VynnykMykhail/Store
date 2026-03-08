import { useContext, useState } from "react";
import { CartContext } from "../context/CartProvider";
import { useNavigate } from "react-router";

const Cart=()=>{
    const {cart, setCart, ClearCart, totalValue} = useContext(CartContext);
    const [error,setError]=useState(null);
    const navigate=useNavigate();
    const handleClick=()=>{
        setError(null);
        navigate("/orderConfirm");
    }

    const increaseCount=(id)=>{
        const products=cart.map((prod)=>{
            if(prod.id===id){
                return{...prod, count: prod.count+1}
            }
            return prod;
        })
        setCart(products)
    };

    const decreaseCount=(id)=>{
        const products=cart.map((prod)=>{
            if(prod.id===id){
                if(prod.count>1){
                    return{...prod, count: prod.count-1}
                }
            }
            return prod;
        })
        setCart(products)
    };

    const deleteProduct=(id)=>{
        const products=cart.filter(prod=>prod.id!==id)
        setCart(products);
    };


    if(cart.length==0){
        return(
            <div className="main">
                <h2>Тележка пуста</h2>
            </div>
        )
    }
    return(
        <div className="main">
            {cart.map((product)=>(
            <div className="cart-product" key={product.id}>
                <div className="display-flex">
                    <div className="image">
                        <img src={product.image} alt="" />
                    </div>
                    <div className="cart-values">
                        <p className="title">{product.name}</p>
                        <p className="price">Стоимость: {product.price}</p>
                    </div>
                </div>
                <div className="cart-count">
                    <button onClick={()=>increaseCount(product.id)}>+</button>
                    <p>{product.count}</p>
                    <button onClick={()=>decreaseCount(product.id)}>-</button>
                    <button onClick={()=>deleteProduct(product.id)}>Убрать</button>
                    <p>Всего за товар: {product.price*product.count}</p>
                </div>
            </div>
            
            ))}
            <h3>Всего: {totalValue}</h3>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <button className="dark-button" onClick={handleClick}>
                    Оформить заказ
                </button>
                <button className="dark-button" onClick={ClearCart}>Очистить тележку</button>
            </div>
            {error?(<><p>{error}</p></>):(<></>)}
            
        </div>
    )
}

export default Cart;