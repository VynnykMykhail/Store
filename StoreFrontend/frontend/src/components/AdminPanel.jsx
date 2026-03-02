import { useState } from "react";
import UpdateProduct from "./AdminPanel/UpdateProduct";
import AddProduct from "./AdminPanel/AddProduct";
import { useNavigate } from "react-router";
import Info from "./AdminPanel/Info";

const AdminPanel = () => {
    const [tools, setTools]=useState(true);
    const[addProduct,setPAdd]=useState(false);
    const[updateProduct,setPUpdate]=useState(false);
    const[deleteProduct,setPDelete]=useState(false);
    const[historyProduct,setHProduct]=useState(false);
    const[historyUser,setHUser]=useState(false);
    const [infoProduct,setIProduct]=useState(false);
    const [infoUser,setIUser]=useState(false);
    const [blockUser,setBUser]=useState(false);
    const [unblockUser,setUbUser]=useState(false);
    const[resetPRating, setRpRating]=useState(false);

    const navigate=useNavigate();

    const closeWindows=()=>{
        setPAdd(false);
        setPUpdate(false);
        setPDelete(false);
        setHProduct(false);
        setHUser(false);
        setIProduct(false);
        setIUser(false);
        setBUser(false);
        setUbUser(false);
        setRpRating(false);
    }
    return (
        <div>
            <h2>Панель администратора</h2>
            {tools?(<></>):(<><button className="dark-button" onClick={()=>{setTools(true);closeWindows()}}>{"<"}</button></>)}
            {tools?(<div className="form">
                <div>
                    <button onClick={()=>{setPAdd(true);setTools(false);}}>Добавить товар</button>
                </div>
                <div>
                    <button onClick={()=>{setPUpdate(true);setTools(false);}}>Обновнить товар</button>
                </div>
                <div>
                    <button onClick={()=>{setPDelete(true);setTools(false);}}>Удалить товар</button>
                </div>
                <div>
                    <button onClick={()=>{setHProduct(true);setTools(false);}}>История покупок товара</button>
                </div>
                <div>
                    <button onClick={()=>{setHUser(true);setTools(false);}}>История покупок пользователя</button>
                </div>
                <div>
                    <button onClick={()=>navigate("/productsInfo")}>Информация о товарах</button>
                </div>
                <div>
                    <button onClick={()=>{setIProduct(true);setTools(false);}}>Информация о товаре</button>
                </div>
                <div>
                    <button onClick={()=>navigate("/usersInfo")}>Информация о пользователях</button>
                </div>
                <div>
                    <button onClick={()=>{setIUser(true);setTools(false);}}>Информация о пользователе</button>
                </div>
                <div>
                    <button onClick={()=>{setBUser(true);setTools(false);}}>Заблокировать пользователя</button>
                </div>
                <div>
                    <button onClick={()=>{setUbUser(true);setTools(false);}}>Разблокировать пользователя</button>
                </div>
                <div>
                    <button onClick={()=>{setRpRating(true);setTools(false);}}>Сбросить оценки товара</button>
                </div>
            </div>):(<>
                {addProduct?(<AddProduct/>):(<></>)}
                {updateProduct?(<UpdateProduct/>):(<></>)}
                {deleteProduct?(<Info request="/api/controllers/product/" type="delete" path="" temp="Введите Id товара"/>):(<></>)}
                {historyProduct?(<Info request="/api/controllers/product/" path="/productHistory/" temp="Введите Id товара"/>):(<></>)}
                {historyUser?(<Info request="/api/controllers/userExists/" path="/userHistory/" temp="Введите Id пользователя"/>):(<></>)}
                {infoProduct?(<Info request="/api/controllers/product/" path="/productsInfo/" temp="Введите Id товара"/>):(<></>)}
                {infoUser?(<Info request="/api/controllers/user/" path="/userInfo/" temp="Введите Id пользователя"/>):(<></>)}
                {blockUser?(<Info request="/api/controllers/blockUser/" type="post" path="" temp="Введите Id пользователя"/>):(<></>)}
                {unblockUser?(<Info request="/api/controllers/unblockUser/" type="delete" path="" temp="Введите Id пользователя"/>):(<></>)}
                {resetPRating?(<Info request="/api/controllers/productRating/" type="delete" path="" temp="Введите Id товара"/>):(<></>)}
            </>)}
            

        </div>
    );
}

export default AdminPanel;
