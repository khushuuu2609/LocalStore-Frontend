import React from 'react'
import {
    Routes,
    Route
} from "react-router-dom";

import Signup from './auth/Signup';
import Footer from './dashboard/Footer';
import Hero from './dashboard/Hero';
import Navbar from './dashboard/Navbar';
import Signin from './auth/Signin';
import Shop from './dashboard/Shop';
import Orders from  './dashboard/Orders';
import SellerReg from  "./dashboard/ExplorAsSeller/SellerReg";
import ContactUs from  './dashboard/ContactUs';
import Notification from  './dashboard/Notification';
import NotificationsBuyers from './dashboard/NotificationsBuyers';
import PaymentPage from  './PaymentPage'
import Profile  from '.dashboard/Profile'

//this component contain all the routes of the website
function DefineRouts() {
    return (
        <>
            <Routes>
                <Route index element={<Signin />} /> {/* index route (default route) */}
                <Route path='/signup' element={<Signup />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/Orders' element={<Orders />} />
                <Route path='/home' element={<Home />} />
                <Route path='/Footer' element={<Footer />} />
                <Route path='/hero' element={<Hero />} />
                <Route path='/navbar' element={<Navbar />} />
                <Route path='/seller' element={<Seller />} />
                <Route path='/contactUs' element={<ContactUs />} />
                <Route path='/sellerReg' element={<SellerReg />} />
                <Route path='/notification' element={<Notification />} />
                <Route path='/notificationBuyers' element={<NotificationsBuyers />} />
                <Route path='/paymentPage' element={<PaymentPage />} />
                <Route path='/paymentPage' element={<PaymentPage />} />
                 <Route path='/Profile' element={<Profile />} />

            </Routes>

        </>
    );
}

export default DefineRouts
