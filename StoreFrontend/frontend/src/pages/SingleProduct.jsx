import { useLoaderData } from "react-router";
import './Pages.css'
import FullProduct from "../components/FullProduct";
import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

const SingleProduct = ()=>{
    const product=useLoaderData();
    const {addToCart}=useContext(CartContext);

    const handleClick=()=>{
        addToCart(product);
    }
    return(
        <div className="main">
            <div style={{width:"710px"}}>
                <div className="Single-product">
                <FullProduct
                    product={product}
                />
                </div>
                <div style={{textAlign:"right"}}>
                        {<button onClick={handleClick} disabled={!product.isAvaible} className="dark-button">{product.isAvaible?("Добавить в корзину"):("Товар недоступен")}</button>}
                </div>
            </div>
        </div>
    )
}

export default SingleProduct;