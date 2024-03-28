import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./dashboard/Navbar";
import Footer from "./dashboard/Footer";

function Layout() {
    const [update, toggleUpdate] = useState(false);
    return (
        <>
            <Navbar />
            <Outlet context={{ update, toggleUpdate }} />
            <Footer />
        </>
    );
}

export default Layout;
