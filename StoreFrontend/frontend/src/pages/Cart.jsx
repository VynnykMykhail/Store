import { useContext, useState } from "react";
import { CartContext } from "../context/CartProvider";
import { useNavigate } from "react-router";

const Cart=()=>{
    const {cart, setCart, totalValue} = useContext(CartContext);
    const [error,setError]=useState(null);
    const token = localStorage.getItem("token");
    const navigate=useNavigate();
    const handleClick=()=>{
        setError(null);
        if(token){
            navigate("/orderConfirm");
        }
        else{
            setError("Сначала войдите в аккаунт")
        }
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
                return{...prod, count: prod.count-1}
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
                <h2>Cart is empty</h2>
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
                        <p className="price">{product.price}</p>
                    </div>
                </div>
                <div className="cart-count">
                    <button onClick={()=>increaseCount(product.id)}>+</button>
                    <p>{product.count}</p>
                    <button onClick={()=>decreaseCount(product.id)}>-</button>
                    <button onClick={()=>deleteProduct(product.id)}>Delete</button>
                    <p>Total price: {product.price*product.count}</p>
                </div>
            </div>
            
            ))}
            {cart.lenght=== 0 ? ( <h3>Cart is empty</h3>) : ( 
                <h3>In total: {totalValue}</h3>)
            }
            <button className="Add" onClick={handleClick}>
                Оформить заказ
            </button>
            {error?(<><p>{error}</p></>):(<></>)}
            
        </div>
    )
}

export default Cart;