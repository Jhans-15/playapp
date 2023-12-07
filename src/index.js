import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

import HomeScreens from "./screens/HomeScreens";
import DetailScreens from './screens/DetailScreens';
import ErrorScreens from "./screens/ErrorScreens";

import './assets/css/global.css'
import { PlaysProvider } from './context/PlaysContext';
import CartScreens from './screens/CartScreens';
import { CartProvider } from './context/CartContext';
import AllScreens from './screens/AllScreens';
import { FilterProvider } from './context/FilterContext';
import { ModalProvider } from './context/ModalContext';
import { UserProvider } from './context/UserContext';
import Images from './screens/Images';
import { DiscountProvider } from './context/DiscountContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeScreens/>,
        errorElement: <ErrorScreens/>
    },
    {
        path: '/details/:id',
        element: <DetailScreens/>,
        errorElement: <ErrorScreens/>
    },
    {
        path: '/cart',
        element: <CartScreens/>,
        errorElement: <ErrorScreens/>
    },
    {
        path: '/all',
        element: <AllScreens/>,
        errorElement: <ErrorScreens/>
    },
    {
        path: '/image/:token',
        element: <Images/>,
        errorElement: <ErrorScreens/>
    }
]);

const existingUserId = Cookies.get('c_user');

// Si la cookie no existe, genera un UUID único y crea la cookie
if (!existingUserId) {
    const uniqueUserId = uuidv4();
    Cookies.set('c_user', uniqueUserId, {expires: 365});
    Cookies.set('creat_at', 'false', {expires: 365});
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <React.StrictMode>
        <PlaysProvider>
            <UserProvider>
                <ModalProvider>
                    <CartProvider>
                        <DiscountProvider>
                            <FilterProvider>
                                <RouterProvider router={router} />
                            </FilterProvider>
                        </DiscountProvider>
                    </CartProvider>
                </ModalProvider>
            </UserProvider>
        </PlaysProvider>
    </React.StrictMode>

);

const classNew = document.getElementById('root');
classNew.classList.add('container');