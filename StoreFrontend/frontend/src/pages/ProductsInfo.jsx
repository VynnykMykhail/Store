import { useLoaderData } from "react-router";


const ProductsInfo = () => {
    const info=useLoaderData();
    return (
        <div>
            {Array.isArray(info)?(<>
                {info.map((item)=>(
                <div key={item.id}>
                    <p>Product id: {item.id}  Name: {item.name}  description: {item.description} Price: {item.price} Rating: {item.rating} Total rating: {item.totalRating} Rating count:{item.ratingCount} Is avaible:{item.isAvaible} Image URL: {item.imageURL}</p>
                </div>
            ))}
            </>):(<>
                <p>Product id: {info.id}  Name: {info.name}  description: {info.description} Price: {info.price} Rating: {info.rating} Total rating: {info.totalRating} Rating count:{info.ratingCount} Is avaible:{info.isAvaible} Image URL: {info.imageURL}</p>
            </>)}
        </div>
    );
}

export default ProductsInfo;
