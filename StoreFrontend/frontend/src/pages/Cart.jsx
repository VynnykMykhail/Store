import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

const Cart=()=>{
    const {cart, setCart, totalValue} = useContext(CartContext);

    const increaseCount=(title)=>{
        const products=cart.map((prod)=>{
            if(prod.title===title){
                return{...prod, count: prod.count+1}
            }
            return prod;
        })
        setCart(products)
    };

    const decreaseCount=(title)=>{
        const products=cart.map((prod)=>{
            if(prod.title===title){
                return{...prod, count: prod.count-1}
            }
            return prod;
        })
        setCart(products)
    };

    const deleteProduct=(title)=>{
        const products=cart.filter(prod=>prod.title!==title)
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
                    <button onClick={()=>increaseCount(product.name)}>+</button>
                    <p>{product.count}</p>
                    <button onClick={()=>decreaseCount(product.name)}>-</button>
                    <button onClick={()=>deleteProduct(product.name)}>Delete</button>
                    <p>Total price: {product.price*product.count}</p>
                </div>
            </div>
            
            ))}
            {cart.lenght=== 0 ? ( <h3>Cart is empty</h3>) : ( 
                <h3>In total: {totalValue}</h3>)
            }
            
        </div>
    )
}

export default Cart;