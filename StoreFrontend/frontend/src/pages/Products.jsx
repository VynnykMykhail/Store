import { Link, useLoaderData} from "react-router";
import {  useState } from "react";
import Product from "../components/Product";
import './Products.css'

const Products = () => {
    const products=useLoaderData();
    const [currentProducts, setProducts]=useState(products);

    const sortAscend = ()=>{
        const sortedProducts=[...currentProducts].sort((a,b) => a.price-b.price);
        setProducts(sortedProducts);
    };

    const sortDescend = ()=>{
        const sortedProducts=[...currentProducts].sort((a,b) => b.price-a.price);
        setProducts(sortedProducts);
    };

    const sortTop = ()=>{
        const sortedProducts=[...currentProducts].sort((a,b) => b.rating-a.rating);
        setProducts(sortedProducts);
    };


    return(
            <div className="main">
                <div className="buttons">
                    <button onClick={sortAscend}>Ascend</button>
                    <button onClick={sortDescend}>Descend</button>
                    <button onClick={sortTop}>Top rated</button>
                </div>
                <div className="products">
                    {currentProducts.map((product) => (
                        
                        <Product 
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
    )
}

export default Products;