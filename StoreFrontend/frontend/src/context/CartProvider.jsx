import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext(null);

const CartProvider = ({children}) => {
    const [cart,setCart]=useState([]);
    const [totalCount,setTotal]=useState(0);
    const [totalValue, setValue]=useState(0);

    const CalculateCount=()=>{
    let count=0;
    cart.map((prod)=>{
        count+=prod.count
      })
    setTotal(count);
  }

  const CalculateValue=()=>{
    let count=0;
    cart.map((prod)=>{
        count+=prod.count*prod.price
      })
    setValue(count);
  }

  const ClearCart=()=>{
    setCart([]);
  }

    useEffect(()=>{
    const cartFromStorage=localStorage.getItem("cart");
    if(cartFromStorage){
      setCart(JSON.parse(cartFromStorage))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    CalculateCount();
    CalculateValue();
  }, [cart]);


  
 

  const addToCart=(product)=>{
    let newCart=[{id: product.id, name: product.name, image: product.imageURL, price: product.price, count:1}]
    if(cart.length===0){
      setCart(newCart);
    }
    else{
      const findProduct=cart.find(existingProduct=>existingProduct.id===product.id)
      if(findProduct){
        findProduct.count++;
        setTotal(totalCount+1);
      }
      else{
      setCart([...cart,...newCart]);
      }
    }
  }
    return (
        <CartContext.Provider value={{cart, setCart, addToCart, ClearCart, totalValue,totalCount}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
