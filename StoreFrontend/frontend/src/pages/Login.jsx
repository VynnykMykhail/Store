import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router";

const Login = () => {
    const {loginRequest}=useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError]=useState(null);
    

    const navigate=useNavigate();
    

    const handleLogin=async ()=>{
        setError(null);
        try{
            const response=await loginRequest({email,password});
            if(response.status==200){
                navigate("/profile");
            }
            else{
                setError(response);
            }
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <div className="registration">
                <h2>Login</h2>
                <input type="text" label="Email" placeholder="Почта" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text" label="Password" placeholder="Пароль" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {error?(<><p>{error}</p></>):(<></>)}
            </div>
            <button onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

export default Login;
