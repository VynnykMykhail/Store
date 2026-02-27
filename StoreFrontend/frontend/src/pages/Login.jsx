import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
    const {loginRequest}=useContext(AuthContext);
    const [form,setForm]=useState({Email:"",Password:""});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin=async ()=>{
        setForm({Email: email, Password:password});
        console.log(form);
        try{
            await loginRequest(form);
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
            </div>
            <button onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

export default Login;
