import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
const API = import.meta.env.VITE_API_BASE;
import api from "../../api/api";

const UpdateProfile = () => {
    const user=useLoaderData();
    const [newUser,setUser]=useState(user);
    const [error,setError] = useState("");
    const [password,setPassword]=useState("");
    const [info1,setInfo1]=useState(false);
    const [info2,setInfo2]=useState(false);
    const [info3,setInfo3]=useState(false);

    const navigate=useNavigate();

    const handleUpdate=async ()=>{
        setError(null);
        let loading=true;
        if(newUser.name.length<4){
            loading=false;
            setError("Слишком короткое имя");
        }
        else if(!newUser.email.includes("@gmail.com")){
            loading=false;
            setError("Неправильный тип почты");
        }
        else if(password.length!=0&&password.length<6){
            loading=false;
            setError("Слишком короткий пароль");
        }
        else if(newUser.phoneNumber!=null){
            if(newUser.phoneNumber.length<13||newUser.phoneNumber.length>13){
                loading=false;
                setError("Неправильный номер телефона");
            }
        }
        if(loading){
            let array={name:newUser.name,email:newUser.email,password: password,phoneNumber:newUser.phoneNumber};
            if(array.password!=null&&array.password.length==0) array.password=null;
            if(array.phoneNumber!=null&&array.phoneNumber.length==0) array.phoneNumber=null;
            try{
                const response=await api.put(`${API}/api/controllers/updateProfile`,array);
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
    

    if(user==null){
        return(
            <div className="main">
                <h3>Не найдено</h3>
            </div>
        )
    }
    return (
        <div className="main form">
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
                    <input type="text" label="Name" placeholder="Имя" value={newUser.name} onChange={(e)=>setUser({...newUser, name:e.target.value})}/>
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
                <input type="text" label="Email" placeholder="Почта" value={newUser.email} onChange={(e)=>setUser({...newUser, email:e.target.value})}/>
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

            <div>
                <input type="text" label="Email" placeholder="Номер телефона" value={newUser.phoneNumber} onChange={(e)=>setUser({...newUser, phoneNumber:e.target.value})}/>
            </div>

            {error?(<><p>{error}</p></>):(<></>)}
            <button  className="dark-button" onClick={handleUpdate}>
                Обновить
            </button>
        </div>
    );
}

export default UpdateProfile;
