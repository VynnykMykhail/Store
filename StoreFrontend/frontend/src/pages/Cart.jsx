import { useOutletContext } from "react-router";

const Cart=()=>{
    const {cart, setCart, totalValue} = useOutletContext();


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


    return(
        <div className="main">
            {cart.map((product)=>(
            <div className="cart-product">
                <div className="display-flex">
                    <div className="image">
                        <img src={product.image} alt="" />
                    </div>
                    <div className="cart-values">
                        <p className="title">{product.title}</p>
                        <p className="price">{product.price}</p>
                    </div>
                </div>
                <div className="cart-count">
                    <button onClick={()=>increaseCount(product.title)}>+</button>
                    <p>{product.count}</p>
                    <button onClick={()=>decreaseCount(product.title)}>-</button>
                    <button onClick={()=>deleteProduct(product.title)}>Delete</button>
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