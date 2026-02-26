import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {createBrowserRouter, RouterProvider} from "react-router"
import { getProducts, getProduct } from './loaders/getProducts';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import { Provider } from 'react-redux';


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
      ]
    }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
);
