import { useLoaderData } from "react-router";
const ProductHistory = () => {
    const history=useLoaderData();
    if(history==null||history.length==0){
        return(
            <div>
                <h3>История не найдена</h3>
            </div>
        )
    }
    return (
        <div>
            {history.map((item)=>(
                <>
                    <p>Product id: {item.productId}  User id: {item.userId}  Date: {item.date} Amount ordered: {item.count} Payment: {item.payment}</p>
                </>
            ))}
        </div>
    );
}

export default ProductHistory;
