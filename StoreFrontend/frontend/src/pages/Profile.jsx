import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { ContractContext } from "../context/ContractProvider";

const Profile = () => {
    const user=useLoaderData();
    const {setUserAdmin}=useContext(AuthContext);
    const {account,connect}=useContext(ContractContext);
    const navigate=useNavigate();

    const logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userAdmin');
        setUserAdmin(false);
        navigate('/products');
    }
    return (
        <div className="main">
            <p>{user.name}</p>
            {account==""?(<></>):(<><p>{account}</p></>)}
            <button onClick={connect}>Подключить кошелёк</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Profile;
