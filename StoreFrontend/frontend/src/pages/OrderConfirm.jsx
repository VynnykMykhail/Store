import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { ContractContext } from "../context/ContractProvider";
import { useNavigate } from "react-router";
const API = import.meta.env.VITE_API_BASE;
import api from "../../api/api";

const OrderConfirm = () => {
    const {cart,totalCount,totalValue, ClearCart}=useContext(CartContext);
    const {account,connect, deposit}=useContext(ContractContext);
    

    const navigate=useNavigate();
    const handleClick=async ()=>{
        
        try{
            await deposit(totalValue);
            alert("Оплата успешна");
            createInfo();
            ClearCart();
            navigate("/products");
        }
        catch(error){
            console.log(error);
            alert("Что-то пошло не так");
        }
    }


    const createInfo=async ()=>{
        try{
            const array=cart.map((item)=>{
                const {id,price,count}=item;
                return{productId:id,count:count,payment:price*count};
            });
            console.log(array);
            const values={Address:account,PurchaseHistory: array};
            console.log(values);
            await api.post(`${API}/api/controllers/PurchaseHistory`, values);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="main">
            <p>Всего товаров: {totalCount}</p>
            <p>Всего к оплате: {totalValue}</p>
            {account?(<>
                <p>Адрес кошелька: {account}</p>
                <button onClick={connect}>Переподключить</button>
                <button onClick={handleClick}>Оплатить</button>
            </>):(
                <>
                    <button onClick={connect}>Подключить кошелёк</button>
                </>
            )}
        </div>
    );
}

export default OrderConfirm;
