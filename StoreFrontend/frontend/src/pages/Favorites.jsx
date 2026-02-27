import React from 'react';
import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesProvider';
import { Link } from 'react-router';

const Favorites = () => {
    const {favorites,setFavorites} = useContext(FavoritesContext);

    const removeFromFavorites=(id)=>{
        const products=favorites.filter(prod=>prod.id!==id)
        setFavorites(products);
    };
    return (
        <div className='main'>
            {favorites.map((product)=>(
                <div className="cart-product">
                    <div className="display-flex">
                        <Link style={{ textDecoration: 'none' }} to={`/products/${product.id}`}>
                            <div className="image">
                                <img src={product.image} alt="" />
                            </div>
                        </Link>
                        <div className="cart-values">
                            <p className="title">{product.name}</p>
                            <p className="price">{product.price}</p>
                            <button onClick={()=>removeFromFavorites(product.id)}>Remove</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Favorites;
