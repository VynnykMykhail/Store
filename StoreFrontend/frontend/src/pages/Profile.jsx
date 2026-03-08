import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { ContractContext } from "../context/ContractProvider";

const Profile = () => {
    const user=useLoaderData();
    const {logout}=useContext(AuthContext);
    const {account,connect}=useContext(ContractContext);
    const navigate=useNavigate();
    
    const handleClick=()=>{
        navigate('/updateProfile')
    }

    const handleOrders=()=>{
        navigate('/myOrders')
    }
    const exit=()=>{
        logout();
        navigate('/products');
    }
    return (
        <div className="main">
            <p>Пользователь: {user.name}</p>
            {account==""?(<></>):(<><p>Адрес кошелька: {account}</p></>)}
            <div>
                <button className="dark-button" onClick={connect}>Подключить кошелёк</button>
            </div>
            <div>
                <button className="dark-button" onClick={handleClick}>Обновить профиль</button>
            </div>
            <div>
                <button className="dark-button" onClick={handleOrders}>Мои заказы</button>
            </div>
            <div>
                <button className="dark-button" onClick={exit}>Выйти</button>
            </div>
        </div>
    );
}

export default Profile;
