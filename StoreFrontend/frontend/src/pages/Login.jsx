import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router";

const Login = () => {
    const {loginRequest, logout}=useContext(AuthContext);
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error,setError]=useState(null);
    const token = localStorage.getItem("token");

    const navigate=useNavigate();
    

    const handleLogin=async ()=>{
        setError(null);
        let loading=true;
        if(!Email.includes("@gmail.com")){
            loading=false;
            setError("Неправильный тип почты");
        }
        else if(Password.length<5){
            loading=false;
            setError("Слишком короткий пароль");
        }
        if(loading){
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
    }

    const handleExit=()=>{
        logout();
    }


    if(token){
        return(
            <div className="main">
                <h3>Сначала выйдите из аккаунта</h3>
                <button className="dark-button" onClick={handleExit}>Выйти</button>
            </div>
        )
    }
    return (
        <div className="main">
            <div className="form">
                <h2>Вход в аккаунт</h2>
                <div>
                    <input type="text" label="Email" placeholder="Почта" value={Email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type="password" label="Password" placeholder="Пароль" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                {error?(<><p>{error}</p></>):(<></>)}
                <button className="dark-button" onClick={handleLogin}>
                    Войти
                </button>
            </div>
            
        </div>
    );
}

export default Login;
