import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {createBrowserRouter, RouterProvider} from "react-router"
import { getProducts, getProduct } from './loaders/getProducts';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites.jsx';
import CartProvider from './context/CartProvider.jsx';
import FavoritesProvider from './context/FavoritesProvider.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Profile from './pages/Profile.jsx';
import { getProfile } from './loaders/getUsers.js';


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "products",
          loader: getProducts,
          element: <Products/>
        },
        {
          path: "products/:id",
          loader: getProduct,
          element: <SingleProduct/>
        },
        {
          path: "cart",
          element:<Cart/>
        },
        {
          path: "favorites",
          element:<Favorites/>
        },
        {
          path:"register",
          element:<Register/>
        },
        {
          path:"login",
          element:<Login/>
        },
        {
          path:"profile",
          loader: getProfile,
          element:<Profile/>
        }
      ]
    }
])

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <FavoritesProvider>
      <CartProvider>
        <RouterProvider router={router}/>
      </CartProvider>
    </FavoritesProvider>
  </AuthProvider>
);
