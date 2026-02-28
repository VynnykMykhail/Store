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
                setError(response);
            }
        }
        catch(error){
            console.log(error);
        }
    }


    return (
        <div>
            <div className="registration">
                <h2>Register</h2>
                <input type="text" label="Name" placeholder="Имя" value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="text" label="Email" placeholder="Почта" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text" label="Password" placeholder="Пароль" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {error?(<><p>{error}</p></>):(<></>)}
            </div>
            <button onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}

export default Register;
