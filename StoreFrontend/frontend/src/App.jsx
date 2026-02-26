import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './pages/Products.css'
import axios from "axios";
import { Outlet, Link } from 'react-router';


function App() {
  /* const [users,setUsers]=useState([]);
  const [products,setProducts]=useState([]);

  async function getUsers(){
    const  response  = await axios.get(`${API}/api/users/users`);
    setUsers(response.data);
  }

  async function getProducts(){
    const  response  = await axios.get(`${API}/api/products/products`);
    setProducts(response.data);
  }

  useEffect(() => {
    getUsers().catch(console.error);
    getProducts().catch(console.error);
  }, []); */
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <header>
        <div className="header-div">
          <div className="cart-button">
            <Link to={`products/cart`}>
              <button>
                <i className="fa-solid fa-cart-shopping"></i>
                <div className="cart-number">
                  {/* {totalCount} */}
                </div>
              </button>
            </Link>
          </div>
          <div className="home-button">
            <Link style={{ textDecoration: 'none', color: 'white'}} to={`products`}>
              <p>Home</p>
            </Link>
          </div>
        </div>
      </header>
      <Outlet/>
    </>
  )
}

export default App
