import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./dashboard/Navbar";
import Footer from "./dashboard/Footer";

function Layout() {
    const [update, toggleUpdate] = useState(false);
    return (
        <>
            <div className="flex poppins flex-col w-full min-h-screen">
                <Navbar />
                <Outlet context={{ update, toggleUpdate }} />
                <Footer />
            </div>
        </>
    );
}

export default Layout;
