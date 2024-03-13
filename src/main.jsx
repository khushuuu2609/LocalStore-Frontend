import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Signin from './components/auth/Signin.jsx'
import Signup from './components/auth/Signup.jsx'
import Home from './components/dashboard/Home.jsx'
import { isLoggedin } from './components/auth/authLoader.js'
import RequiredAuth from './components/RequiredAuth.jsx'
import Layout from './components/Layout.jsx'
import Shop from './components/dashboard/Shop.jsx'
import ContactUs from './components/dashboard/ContactUs.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SellerReg from './components/dashboard/ExplorAsSeller/SellerReg.jsx'
import Orders from './components/dashboard/Orders.jsx'
import Profile from './components/dashboard/Profile.jsx'
import Notifications from './components/dashboard/Notification.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    // pubic routes
    <>
      <Route path="/" loader={isLoggedin}>
        <Route index element={<Signin />} />
        <Route path='signup' element={<Signup />} />
      </Route>

      <Route path='/*' element={<RequiredAuth />}>
        <Route element={<Layout />} >
          <Route path='home' element={<Home />} />
          <Route path='contact' element={<ContactUs />} />
          <Route path='shop' element={<Shop />} />
          <Route path='seller' element={<SellerReg />} />
          <Route path='orders' element={<Orders />} />
          <Route path='profile' element={<Profile />} />
          <Route path='notification' element={<Notifications />} />

        </Route>
      </Route>
    </>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
