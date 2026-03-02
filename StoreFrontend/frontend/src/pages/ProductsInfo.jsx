import { useLoaderData } from "react-router";
import api from "../../api/api";
import { useState } from "react";
const API = import.meta.env.VITE_API_BASE;

const ProductsInfo = ({infoType}) => {
    const info=useLoaderData();
    const [status,setStatus]=useState();
    const getUserStatus=async (id)=>{
        try{
            const response=await api.get(`${API}/api/controllers/blockedUser/`+id);
            if(response.status==200){
                if(response.data==true){
                    setStatus("Blocked");
                }
                if(response.data==false){
                    setStatus("Not blocked");
                }
            }
        }
        catch(error){
            console.log(error);
            setStatus("Unknown");
        }
    }

    if(info==null){
        return(
            <div>
                <h3>Не найдено</h3>
            </div>
        )
    }

    if(infoType!=null&&infoType=="User"){
        if(info.id!=null)
        getUserStatus(info.id);
        return(
            <div>
                {Array.isArray(info)?(<>
                    {info.map((item)=>(
                    <div key={item.id}>
                        <p>User id: {item.id} Name: {item.name} Email: {item.email} Is admin: {item.isAdmin?("True"):("False")}</p>
                    </div>
                ))}</>):(<>
                <p>User id: {info.id} Name: {info.name} Email: {info.email} Is admin: {info.isAdmin?("True"):("False")} Status: {status}</p></>)}
            </div>
        )
    }
    return (
        <div>
            {Array.isArray(info)?(<>
                {info.map((item)=>(
                <div key={item.id}>
                    <p>Product id: {item.id}  Name: {item.name}  description: {item.description} Price: {item.price} Rating: {item.rating} Total rating: {item.totalRating} Rating count:{item.ratingCount} Is avaible:{item.isAvaible} Image URL: {item.imageURL}</p>
                </div>
            ))}
            </>):(<>
                <p>Product id: {info.id}  Name: {info.name}  description: {info.description} Price: {info.price} Rating: {info.rating} Total rating: {info.totalRating} Rating count:{info.ratingCount} Is avaible:{info.isAvaible} Image URL: {info.imageURL}</p>
            </>)}
        </div>
    );
}

export default ProductsInfo;
