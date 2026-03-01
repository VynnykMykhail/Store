import { useLoaderData } from "react-router";
import './Products.css'
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
            <div className="Single-product">
            <FullProduct
                product={product}
            />
            </div>
            <div className="Add">
                    {<button onClick={handleClick} disabled={!product.isAvaible}>{product.isAvaible?("Добавить в корзину"):("Товар недоступен")}</button>}
            </div>
        </div>
    )
}

export default SingleProduct;