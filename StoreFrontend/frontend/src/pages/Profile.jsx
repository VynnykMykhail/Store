import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { ContractContext } from "../context/ContractProvider";

const Profile = () => {
    const user=useLoaderData();
    const {setUserAdmin}=useContext(AuthContext);
    const {account,setAccount,connect}=useContext(ContractContext);
    const navigate=useNavigate();

    const logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userAdmin');
        setUserAdmin(false);
        setAccount("");
        navigate('/products');
    }
    return (
        <div className="main">
            <p>{user.name}</p>
            {account==""?(<></>):(<><p>{account}</p></>)}
            <div>
                <button className="dark-button" onClick={connect}>Подключить кошелёк</button>
            </div>
            <div>
                <button className="dark-button" onClick={logout}>Logout</button>
            </div>
        </div>
    );
}

export default Profile;
