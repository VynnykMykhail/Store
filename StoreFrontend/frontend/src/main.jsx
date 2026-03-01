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
import ContractProvider from './context/ContractProvider.jsx';
import OrderConfirm from './pages/OrderConfirm.jsx';
import { getProductHistory, getUserHistory } from './loaders/getHistory.js';
import ProductHistory from './pages/ProductHistory.jsx';
import ProductsInfo from './pages/ProductsInfo.jsx';


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
        },
        {
          path:"orderConfirm",
          element:<OrderConfirm/>
        },
        {
          path: "productHistory/:id",
          loader: getProductHistory,
          element: <ProductHistory/>
        },
        {
          path: "userHistory/:id",
          loader: getUserHistory,
          element: <ProductHistory/>
        },
        {
          path:"productsInfo",
          loader:getProducts,
          element:<ProductsInfo/>
        },
        {
          path:"productsInfo/:id",
          loader:getProduct,
          element:<ProductsInfo/>
        }
      ]
    }
])

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ContractProvider>
      <FavoritesProvider>
        <CartProvider>
          <RouterProvider router={router}/>
        </CartProvider>
      </FavoritesProvider>
    </ContractProvider>
  </AuthProvider>
);
