import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router";

const Login = () => {
    const {loginRequest}=useContext(AuthContext);
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error,setError]=useState(null);
    

    const navigate=useNavigate();
    

    const handleLogin=async ()=>{
        setError(null);
        try{
            const response=await loginRequest({Email,Password});
            if(response.status==200){
                navigate("/profile");
            }
            else{
                setError(response.data);
            }
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className="main">
            <div className="form">
                <h2>Вход в аккаунт</h2>
                <div>
                    <input type="text" label="Email" placeholder="Почта" value={Email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type="text" label="Password" placeholder="Пароль" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                {error?(<><p>{error}</p></>):(<></>)}
                <button onClick={handleLogin}>
                    Войти
                </button>
            </div>
            
        </div>
    );
}

export default Login;
