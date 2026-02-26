const FullProduct = ({image, title,price,rating})=>{
    return(
        <div className="Full-product">
            <div className="image">
                <img src={image} alt="" />
            </div>
            <p className="title">{title}</p>
                <div className="product-values">
                    <p className="price">{"Цена: "+price}</p>
                    <p className="rating">{"Рейтинг: "+rating}</p>
                </div>
        </div>
    )
}

export default FullProduct;