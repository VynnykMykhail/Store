import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext(null);

const FavoritesProvider = ({children}) => {

    const [favorites,setFavorites]=useState([]); 
  

  useEffect(()=>{
    const favoritesFromStorage=localStorage.getItem("favorites");
    if(favoritesFromStorage){
      setFavorites(JSON.parse(favoritesFromStorage))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isInFavorites=(id)=>{
    const findProduct=favorites.find(existingProduct=>existingProduct.id===id);
    if(findProduct) return true;
    else return false;
  }


  
    const addToFavorites=(product)=>{
        let newFavorites=[{id: product.id, name: product.name, image: product.imageURL, price: product.price, count:1}]
        if(favorites.length===0){
        setFavorites(newFavorites);
        }
        else{
        const findProduct=favorites.find(existingProduct=>existingProduct.id===product.id)
        if(findProduct){
            const products=favorites.filter(prod=>prod.id!==product.id)
            setFavorites(products);
        }
        else{
        setFavorites([...favorites,...newFavorites]);
        }
        }
    }

    return (
        <FavoritesContext.Provider value={{favorites, setFavorites, isInFavorites,addToFavorites}}>
                    {children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesProvider;
