import { useState } from "react";
import { useNavigate } from "react-router";

const PhoneNumber = () => {
    const [num,setNum]=useState("");
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate("phoneHistory/"+num);
    }
    return (
        <div>
            <div className='form'>
            <input type="text" label="Id" placeholder={"Введите номер телефона"} value={num} onChange={(e)=>setNum(e.target.value)}/>
            <button className="dark-button" onClick={handleClick}>Найти</button>
        </div>
        </div>
    );
}

export default PhoneNumber;
