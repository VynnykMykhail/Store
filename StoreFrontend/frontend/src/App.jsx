import { useContext, useState } from 'react'
import './App.css'
import { Outlet, Link } from 'react-router';
import { useNavigate } from 'react-router';
import { AuthContext } from './context/AuthProvider';
import AdminPanel from './components/AdminPanel';
import { CartContext } from './context/CartProvider';


function App() {
  const token = localStorage.getItem("token");
  const{userAdmin}=useContext(AuthContext);
  const{totalCount}=useContext(CartContext);
  const navigate=useNavigate();
  const [visible,setVisible]=useState(false);
  const [panelVisible,setPanel]=useState(false);

  const handleClick=()=>{
    if(token){
      navigate('/profile');
    }
    else{
      visible? setVisible(false):setVisible(true);
    }
  }

  const handlePanel=()=>{
    if(panelVisible){
      setPanel(false);
    }
    else{
      setPanel(true);
    }
  }

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <header>
        <div className="header-div">
          <div className="user-button">
            <button onClick={handleClick}>
              <i className="fa-solid fa-user"></i>
            </button>
            {visible? (<div className='login-buttons'>
                  <button style={{fontSize:"16px"}} onClick={()=>{setVisible(false); navigate("/register")}}>Register</button>
                  <button style={{fontSize:"16px"}} onClick={()=>{setVisible(false); navigate("/login")}}>Login</button>
                </div>)
                :(<></>)}
          </div>
          <div className="cart-button">
            <Link to={`/cart`}>
              <button>
                <i className="fa-solid fa-cart-shopping"></i>
                <div className="cart-number">
                  {totalCount}
                </div>
              </button>
            </Link>
          </div>
          <div className="favorites-button">
            <Link style={{ textDecoration: 'none', color: 'white'}} to={`favorites`}>
              <p>Избранное</p>
            </Link>
          </div>
          <div className="home-button">
            <Link style={{ textDecoration: 'none', color: 'white'}} to={`products`}>
              <p>Домой</p>
            </Link>
          </div>
        </div>
      </header>
      {userAdmin?(<><button className="dark-button" onClick={handlePanel}>Панель</button></>):(<></>)}
      <div className={`panel ${panelVisible ? 'active' : ''}`}>
        <AdminPanel/>
      </div>
      <Outlet/>
    </>
  )
}

export default App
