import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './dashboard/Navbar'
import Footer from './dashboard/Footer'

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
