import { useState } from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <div className="registration">
                <h2>Register</h2>
                <input type="text" label="Name" placeholder="Имя" value={name} onChange={setName}/>
                <input type="text" label="Email" placeholder="Почта" value={email} onChange={setEmail}/>
                <input type="text" label="Password" placeholder="Пароль" value={password} onChange={setPassword}/>
            </div>
        </div>
    );
}

export default Register;
