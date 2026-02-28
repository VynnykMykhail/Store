import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const Profile = () => {
    const user=useLoaderData();
    const {setUserAdmin}=useContext(AuthContext);
    const navigate=useNavigate();

    const logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userAdmin');
        setUserAdmin(false);
        navigate('/products');
    }
    return (
        <div>
            <p>{user.name}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Profile;
