import { Link } from "react-router";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesProvider";
const Product = ({product})=>{
    const {isInFavorites,addToFavorites}=useContext(FavoritesContext);
    const handleClick=()=>{
        addToFavorites(product);
    }
    return(
        <div className="product">
            <div className="icon">
                <button onClick={handleClick}>
                    {isInFavorites(product.id)?(<i class="fa-solid fa-heart" style={{color:'#74026e'}}></i>):(<i class="fa-regular fa-heart" ></i>)}
                </button>
            </div>
            <Link style={{ textDecoration: 'none' }} to={`/products/${product.id}`}>
                <div className="image">
                    <img src={product.imageURL} alt="" />
                </div>
            </Link>
            <p className="title">{product.name}</p>
            <div className="product-values">
                <p className="price">{product.price}</p>
                <p className="rating">R: {product.rating}</p>

            </div>
        </div>
    )
}

export default Product;