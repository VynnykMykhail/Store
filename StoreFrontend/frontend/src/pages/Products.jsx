import {  useLoaderData} from "react-router";
import {  useEffect, useState } from "react";
import Product from "../components/Product";
import './Pages.css'
const API = import.meta.env.VITE_API_BASE;
import api from "../../api/api";

const Products = () => {
    const products=useLoaderData();
    const [currentProducts, setProducts]=useState(products);
    const [filteredProducts,setFiltered]=useState(products);
    const [search,setSearch]=useState("");
    const [categories,setCategories]=useState(null);


    useEffect(()=>{
        const getCategory=async()=>{
            try{
                const response=await api.get(`${API}/api/controllers/categories`);
                setCategories(response.data);
            }
            catch(error){
                console.log(error)
            }
        }
        getCategory();
    },[products]);

    const handleSearch=()=>{
        const searchedProducts=filteredProducts.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()));
        setProducts(searchedProducts);
    };

    const handleCategory=(e)=>{
        let filteredProducts;
        if(e){
            filteredProducts=products.filter(p=>p.category==e);
            setProducts(filteredProducts);
            setFiltered(filteredProducts);
        }
        else{
            setProducts(products);
            setFiltered(products);
        }
    }

    const sortAscend = ()=>{
        const sortedProducts=[...currentProducts].sort((a,b) => a.price-b.price);
        setProducts(sortedProducts);
    };

    const sortDescend = ()=>{
        const sortedProducts=[...currentProducts].sort((a,b) => b.price-a.price);
        setProducts(sortedProducts);
    };

    const sortTop = ()=>{
        const sortedProducts=[...currentProducts].sort((a,b) => b.rating-a.rating);
        setProducts(sortedProducts);
    };

    if(products==null){
        return(
            <div className="main">
                <h2>Не найдено</h2>
            </div>
        )
    }
    if(categories==null){
        return(
            <div className="main">
                <h3>Загрузка</h3>
            </div>
        )
    }
    return(
            <div className="main">
                <div className="form">
                    <div style={{display:"flex",flexWrap:"wrap", justifyContent:"end"}}>
                        <div>
                            <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                            <button className="dark-button" onClick={handleSearch} style={{marginLeft:"10px"}}>Найти</button>
                        </div>
                        <div className="buttons">
                            <button onClick={sortAscend}>По возрастанию</button>
                            <button onClick={sortDescend}>По убыванию</button>
                            <button onClick={sortTop}>По рейтингу</button>
                        </div>
                    </div>
                    
                </div>
                
                <div style={{textAlign:"right", marginTop:"10px"}}>
                    <select className="dark-button" id="category" onChange={(e)=>handleCategory(e.target.value)}>
                        <option value={""}>Все</option>
                        {categories.map((item)=>(
                                <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="products">
                    {currentProducts.length==0?(<><h3>Соответствующих товаров не найдено</h3></>):(<>
                        {currentProducts.map((product) => (
                            
                            <Product 
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </>)}
                </div>
            </div>
    )
}

export default Products;