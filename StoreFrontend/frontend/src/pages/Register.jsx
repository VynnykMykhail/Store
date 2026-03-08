import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router";

const Register = () => {
    const {registerRequest, logout}=useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError]=useState(null);
    const [info1,setInfo1]=useState(false);
    const [info2,setInfo2]=useState(false);
    const [info3,setInfo3]=useState(false);
    const token = localStorage.getItem("token");

    const navigate=useNavigate();

    const handleRegister=async ()=>{
        setError(null);
        let loading=true;
        if(name.length<4){
            loading=false;
            setError("Слишком короткое имя");
        }
        else if(!email.includes("@gmail.com")){
            loading=false;
            setError("Неправильный тип почты");
        }
        else if(password.length<6){
            loading=false;
            setError("Слишком короткий пароль");
        }
        if(loading){
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
                <div className="form" style={{margin:0}}>
                    <h2>Регистрация</h2>
                    <div style={{maxWidth:"fit-content"}}>
                        <div style={{display:"flex",justifyContent:"end",margin:"0"}}>
                            <button className="form-info" onClick={info1?()=>setInfo1(false):()=>setInfo1(true)}>i
                                {info1?(<>
                                    <div className="form-info-data">
                                        <p>Имя должно содержать буквы и быть длинее 4 символов</p>
                                    </div>
                                </>):(<></>)}
                            </button>
                            
                        </div>
                        <input type="text" label="Name" placeholder="Имя" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div style={{maxWidth:"fit-content"}}>
                        <div style={{display:"flex",justifyContent:"end",margin:"0"}}>
                            <button className="form-info" onClick={info2?()=>setInfo2(false):()=>setInfo2(true)}>i
                                {info2?(<>
                                    <div className="form-info-data">
                                        <p>Почта должна содержать @gmail.com</p>
                                    </div>
                                </>):(<></>)}
                            </button>
                            
                        </div>
                        <input type="text" label="Email" placeholder="Почта" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div style={{maxWidth:"fit-content"}}>
                        <div style={{display:"flex",justifyContent:"end",margin:"0"}}>
                            <button className="form-info" onClick={info3?()=>setInfo3(false):()=>setInfo3(true)}>i
                                {info3?(<>
                                    <div className="form-info-data">
                                        <p>Пароль должен содержать буквы и быть длинее 6 симолов</p>
                                    </div>
                                </>):(<></>)}
                            </button>
                            
                        </div>
                        <input type="password" label="Password" placeholder="Пароль" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        
                    </div>
                    {error?(<><p>{error}</p></>):(<></>)}
                    <button className="dark-button" onClick={handleRegister}>
                        Зарегистрироваться
                    </button>
                </div>

            
        </div>
    );
}

export default Register;
