import { useLoaderData } from "react-router";
import api from "../../api/api";
import { useState } from "react";
const API = import.meta.env.VITE_API_BASE;

const InfoPage = ({infoType}) => {
    const info=useLoaderData();
    const [status,setStatus]=useState();
    const[filter,setFilter]=useState(info);
    const [search,setSearch]=useState("");

    const handleSearch=()=>{
        const filteredProducts=info.filter(u=>u.email.toLowerCase().includes(search.toLowerCase()));
        setFilter(filteredProducts);
    }
    
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
        if(info.id!=null){
            getUserStatus(info.id);
            if(status==null){
                return(
                    <div className="main">
                        <h3>loading</h3>
                    </div>
                )
            }
        }
        return(
            <div>
                {Array.isArray(info)?(<>
                    <div className="main">
                        <input className="dark-button" type="text" placeholder="Поиск по почте" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                        <button className="dark-button" onClick={handleSearch} style={{marginLeft:"10px"}}>Найти</button>
                    </div>
                    {filter.map((item)=>(
                    <div key={item.id}>
                        <p>User id: {item.id} Name: {item.name} Email: {item.email} Is admin: {item.isAdmin?("True"):("False")}</p>
                    </div>
                ))}</>):(<>
                <p>User id: {info.id} Name: {info.name} Email: {info.email} Is admin: {info.isAdmin?("True"):("False")} Status: {status}</p></>)}
            </div>
        )
    }
    if(infoType!=null&&infoType=="Images"){
        return(
            <div style={{display:"flex",flexWrap:"wrap"}}>
                {info.map((item)=>(
                    <div key={item.id}>
                        <img src={API+"/img/"+item.url} alt="" style={{maxWidth:"130px"}}/>
                    </div>
                ))}
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

export default InfoPage;
