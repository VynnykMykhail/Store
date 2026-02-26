import { useLoaderData } from "react-router";
import './Products.css'
import FullProduct from "../components/FullProduct";
import { useOutletContext } from "react-router";

const SingleProduct = ()=>{
    const product=useLoaderData();
    /* const {addToCart}=useOutletContext(); */

    /* const handleClick=()=>{
        addToCart(product);
    } */
    return(
        <div className="main">
            <div className="Single-product">
            <FullProduct
                image={product.imageURL}
                title={product.name}
                price={product.price}
                rating={product.rating}
            />
            </div>
            <div className="Add">
                    {/* <button onClick={handleClick}>Добавить в корзину</button> */}
            </div>
        </div>
    )
}

export default SingleProduct;