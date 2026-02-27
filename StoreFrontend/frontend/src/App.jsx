import { useState } from 'react'
import './pages/Products.css'
import { Outlet, Link } from 'react-router';


function App() {
  
  const [visible,setVisible]=useState(false);
  const handleClick=()=>{
    visible? setVisible(false):setVisible(true);
  }

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <header>
        <div className="header-div">
          <div className="user-button">
            <button onClick={handleClick}>
              <i class="fa-solid fa-user"></i>
              {visible? (<div className='login-buttons'>
                <Link to={`/register`}>
                  <button style={{fontSize:"16px"}}>Register</button>
                </Link>
                <Link to={`/login`}>
                  <button style={{fontSize:"16px"}}>Login</button>
                </Link>
                </div>)
                :(<></>)}
            </button>
          </div>
          <div className="cart-button">
            <Link to={`/cart`}>
              <button>
                <i className="fa-solid fa-cart-shopping"></i>
                <div className="cart-number">

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
