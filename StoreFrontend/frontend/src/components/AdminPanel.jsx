import { useState } from "react";
import UpdateProduct from "./AdminPanel/UpdateProduct";
import AddProduct from "./AdminPanel/AddProduct";
import { useNavigate } from "react-router";
import Info from "./AdminPanel/Info";
import UploadImage from "./AdminPanel/UploadImage";
import PhoneNumber from "./AdminPanel/PhoneNumber";
import BlockUser from "./AdminPanel/BlockUser";
import AddLocation from "./AdminPanel/AddLocation";

const AdminPanel = () => {
    const [tools, setTools]=useState(true);
    const[addProduct,setPAdd]=useState(false);
    const[updateProduct,setPUpdate]=useState(false);
    const[deleteProduct,setPDelete]=useState(false);
    const[historyProduct,setHProduct]=useState(false);
    const[historyUser,setHUser]=useState(false);
    const [historyPhone,setHPhone]=useState(false);
    const [infoProduct,setIProduct]=useState(false);
    const [infoUser,setIUser]=useState(false);
    const [blockUser,setBUser]=useState(false);
    const [unblockUser,setUbUser]=useState(false);
    const[resetPRating, setRpRating]=useState(false);
    const[imageUp,setImageUp]=useState(false);
    const[category,setCategory]=useState(false);
    const[location,setLocation]=useState(false);

    const navigate=useNavigate();

    const closeWindows=()=>{
        setPAdd(false);
        setPUpdate(false);
        setPDelete(false);
        setHProduct(false);
        setHUser(false);
        setHPhone(false);
        setIProduct(false);
        setIUser(false);
        setBUser(false);
        setUbUser(false);
        setRpRating(false);
        setImageUp(false);
        setCategory(false);
        setLocation(false);
    }
    return (
        <div>
            <h2>Панель администратора</h2>
            {tools?(<></>):(<><button className="dark-button" onClick={()=>{setTools(true);closeWindows()}}>{"<"}</button></>)}
            {tools?(<div className="form admin-panel">
                <div>
                    <button onClick={()=>{setPAdd(true);setTools(false);}}>Добавить товар</button>
                    <button onClick={()=>{setPUpdate(true);setTools(false);}}>Обновнить товар</button>
                    <button onClick={()=>{setPDelete(true);setTools(false);}}>Удалить товар</button>
                    <button onClick={()=>{setRpRating(true);setTools(false);}}>Сбросить оценки товара</button>
                </div>
                <div>
                    <button onClick={()=>{setHProduct(true);setTools(false);}}>История покупок товара</button>
                    <button onClick={()=>navigate("/productsInfo")}>Информация о товарах</button>
                    <button onClick={()=>{setIProduct(true);setTools(false);}}>Информация о товаре</button>
                </div>
                <div>
                    <button onClick={()=>{setHUser(true);setTools(false);}}>История покупок пользователя</button>
                    <button onClick={()=>{setHPhone(true);setTools(false);}}>История покупок по телефону</button>
                    <button onClick={()=>navigate("/usersInfo")}>Информация о пользователях</button>
                    <button onClick={()=>{setIUser(true);setTools(false);}}>Информация о пользователе</button>
                    <button onClick={()=>{setBUser(true);setTools(false);}}>Заблокировать пользователя</button>
                    <button onClick={()=>{setUbUser(true);setTools(false);}}>Разблокировать пользователя</button>
                </div>
                <div>
                    <button onClick={()=>navigate("/images")}>Изображения</button>
                    <button onClick={()=>{setImageUp(true);setTools(false);}}>Загрузить изображение</button>
                </div>
                <div>
                    <button onClick={()=>{setCategory(true);setTools(false);}}>Добавить категорию товара</button>
                    <button onClick={()=>{setLocation(true);setTools(false);}}>Добавить способ доставки</button>
                </div>
            </div>):(<>
                {addProduct?(<AddProduct/>):(<></>)}
                {updateProduct?(<UpdateProduct/>):(<></>)}
                {deleteProduct?(<Info request="/api/controllers/product/" type="delete" path="" temp="Введите Id товара"/>):(<></>)}
                {historyProduct?(<Info request="/api/controllers/product/" path="/productHistory/" temp="Введите Id товара"/>):(<></>)}
                {historyUser?(<Info request="/api/controllers/userExists/" path="/userHistory/" temp="Введите Id пользователя"/>):(<></>)}
                {historyPhone?(<PhoneNumber/>):(<></>)}
                {infoProduct?(<Info request="/api/controllers/product/" path="/productsInfo/" temp="Введите Id товара"/>):(<></>)}
                {infoUser?(<Info request="/api/controllers/user/" path="/userInfo/" temp="Введите Id пользователя"/>):(<></>)}
                {blockUser?(<BlockUser request="/api/controllers/blockUser" type="post" text="Заблокировать"/>):(<></>)}
                {unblockUser?(<BlockUser type="delete" text="Разблокировать"/>):(<></>)}
                {resetPRating?(<Info request="/api/controllers/productRating/" type="delete" path="" temp="Введите Id товара"/>):(<></>)}
                {imageUp?(<UploadImage/>):(<></>)}
                {category?(<Info request="/api/controllers/category/" type="post" path="" temp="Введите текст" text="Создать"/>):(<></>)}
                {location?(<AddLocation/>):(<></>)}
            </>)}
            

        </div>
    );
}

export default AdminPanel;
