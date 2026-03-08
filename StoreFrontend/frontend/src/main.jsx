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
import { getProfile, getUser, getUsers } from './loaders/getUsers.js';
import ContractProvider from './context/ContractProvider.jsx';
import OrderConfirm from './pages/OrderConfirm.jsx';
import { getMyOrders, getPhoneHistory, getProductHistory, getUserHistory } from './loaders/getHistory.js';
import ProductHistory from './pages/ProductHistory.jsx';
import InfoPage from './pages/InfoPage.jsx';
import { getImages } from './loaders/getImages.js';
import UpdateProfile from './pages/UpdateProfile.jsx';
import { getLocations } from './loaders/getOrdersLocation.js';
import MyOrders from './pages/MyOrders.jsx';


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
          path:"updateProfile",
          loader: getProfile,
          element:<UpdateProfile/>
        },
        {
          path:"orderConfirm",
          loader: getLocations,
          element:<OrderConfirm/>
        },
        {
          path:"myOrders",
          loader: getMyOrders,
          element:<MyOrders/>
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
          path:"phoneHistory/:num",
          loader: getPhoneHistory,
          element: <ProductHistory/>
        },
        {
          path:"productsInfo",
          loader:getProducts,
          element:<InfoPage/>
        },
        {
          path:"productsInfo/:id",
          loader:getProduct,
          element:<InfoPage/>
        },
        {
          path:"usersInfo",
          loader:getUsers,
          element:<InfoPage infoType="User"/>
        },
        {
          path:"userInfo/:id",
          loader:getUser,
          element:<InfoPage infoType="User"/>
        },
        {
          path:"images",
          loader: getImages,
          element:<InfoPage infoType="Images"/>
        }
      ]
    }
])

createRoot(document.getElementById('root')).render(
  <ContractProvider>
    <AuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <RouterProvider router={router}/>
          </CartProvider>
        </FavoritesProvider>
    </AuthProvider>
  </ContractProvider>
);
