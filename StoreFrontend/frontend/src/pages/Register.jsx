import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router";

const Register = () => {
    const {registerRequest}=useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError]=useState(null);

    const navigate=useNavigate();

    const handleRegister=async ()=>{
        setError(null);
        try{
            const response=await registerRequest({name,email,password});
            if(response.status==200){
                navigate("/profile");
            }
            else{
                setError(response.data);
            }
        }
        catch(error){
            console.log(error);
        }
    }


    return (
        <div className="main">
            <div className="form" style={{margin:0}}>
                <h2>Регистрация</h2>
                <div>
                    <input type="text" label="Name" placeholder="Имя" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <input type="text" label="Email" placeholder="Почта" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type="text" label="Password" placeholder="Пароль" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                {error?(<><p>{error}</p></>):(<></>)}
                <button onClick={handleRegister}>
                    Зарегистрироваться
                </button>
            </div>
            
        </div>
    );
}

export default Register;
