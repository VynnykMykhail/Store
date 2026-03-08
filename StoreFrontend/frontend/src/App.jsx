import { useContext, useState } from 'react'
import './App.css'
import { Outlet, Link } from 'react-router';
import { useNavigate } from 'react-router';
import { AuthContext } from './context/AuthProvider';
import AdminPanel from './components/AdminPanel';
import { CartContext } from './context/CartProvider';



function App() {
  const token = localStorage.getItem("token");
  const{isAdmin}=useContext(AuthContext);
  const{totalCount}=useContext(CartContext);
  const navigate=useNavigate();
  const [visible,setVisible]=useState(false);
  const [panelVisible,setPanel]=useState(false);
  
  //console.log(decode?.[roleClaim]);

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
          
          <div></div>
          <div className="home-button">
            <Link style={{ textDecoration: 'none', color: 'white'}} to={`products`}>
              <p>Главная</p>
            </Link>
          </div>
          <div className='display-w-a'>
            <div className='display-w-a'>
              <div className="cart-button">
                <Link to={`/cart`}>
                  <button>
                    <i className="fa-solid fa-cart-shopping"></i>
                    {totalCount>0?(<>
                    <div className="cart-number">
                      {totalCount}
                    </div>
                    </>):(<></>)}
                    
                  </button>
                </Link>
                
              </div>
                <Link style={{ textDecoration: 'none', color: 'white'}} to={`favorites`}>
                  <p>Избранное</p>
                </Link>
              </div>
              <div className="user-button">
                <button onClick={handleClick}>
                  <i className="fa-solid fa-user"></i>
                </button>
                {visible? (<div className='login-buttons'>
                      <button style={{fontSize:"16px"}} onClick={()=>{setVisible(false); navigate("/register")}}>Регистрация</button>
                      <button style={{fontSize:"16px"}} onClick={()=>{setVisible(false); navigate("/login")}}>Вход</button>
                    </div>)
                    :(<></>)}
              </div>
          </div>
        </div>
      </header>
      
      <div>
        <div className={`panel-button-container ${panelVisible ? 'active' : ''}`}>
          {isAdmin?(<><button className="dark-button" onClick={handlePanel}>Панель</button></>):(<></>)}
        </div>
        <div className={`panel ${panelVisible ? 'active' : ''}`}>
          <AdminPanel/>
        </div>
      </div>
      <Outlet/>
    </>
  )
}

export default App
