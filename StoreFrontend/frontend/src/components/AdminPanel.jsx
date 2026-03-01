import { useState } from "react";
import UpdateProduct from "./AdminPanel/UpdateProduct";
import AddProduct from "./AdminPanel/AddProduct";
import DeleteProduct from "./AdminPanel/DeleteProduct";
import ProductHistory from "./AdminPanel/ProductHistory";
import UserHistory from "./AdminPanel/UserHistory";
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

    const navigate=useNavigate();

    const closeWindows=()=>{
        setPAdd(false);
        setPUpdate(false);
        setPDelete(false);
        setHProduct(false);
        setHUser(false);
        setIProduct(false);
    }
    return (
        <div>
            <h2>Панель администратора</h2>
            <button onClick={()=>{setTools(true);closeWindows()}}>{"<"}</button>
            {tools?(<div>
                <button onClick={()=>{setPAdd(true);setTools(false);}}>Добавить товар</button>
                <button onClick={()=>{setPUpdate(true);setTools(false);}}>Обновнить товар</button>
                <button onClick={()=>{setPDelete(true);setTools(false);}}>Удалить товар</button>
                <button onClick={()=>{setHProduct(true);setTools(false);}}>История покупок товара</button>
                <button onClick={()=>{setHUser(true);setTools(false);}}>История покупок пользователя</button>
                <button onClick={()=>navigate("/productsInfo")}>Информация о товарах</button>
                <button onClick={()=>{setIProduct(true);setTools(false);}}>Информация о товаре</button>
            </div>):(<>
                {addProduct?(<AddProduct/>):(<></>)}
                {updateProduct?(<UpdateProduct/>):(<></>)}
                {deleteProduct?(<DeleteProduct/>):(<></>)}
                {historyProduct?(<ProductHistory/>):(<></>)}
                {historyUser?(<UserHistory/>):(<></>)}
                {infoProduct?(<Info request="/api/controllers/product/" path="/productsInfo/" temp="Введите Id товара"/>):(<></>)}
            </>)}
            

        </div>
    );
}

export default AdminPanel;
