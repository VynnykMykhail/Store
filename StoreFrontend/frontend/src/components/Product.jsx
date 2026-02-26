const Product = ({image, title,price,rating})=>{
    return(
        <div className="product">
            <div className="image">
                <img src={image} alt="" />
            </div>
            <p className="title">{title}</p>
            <div className="product-values">
                <p className="price">{price}</p>
                <p className="rating">{rating}</p>
            </div>
        </div>
    )
}

export default Product;