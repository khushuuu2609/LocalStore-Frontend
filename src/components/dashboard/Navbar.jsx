import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';

function Navbar() {
    const { role } = JSON.parse(localStorage.getItem("token"));
    const [notifications, setNotifications] = useState([]);
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate()
    function logout() {
        if (confirm("Are you sure you want to logout?")) {
            localStorage.clear();
            navigate("/");
        }
    }

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const response = await fetch(
                    `http://localhost:8080/api/notifications?userId=${token.userId}`,
                    {
                        method: "GET",
                    }
                );
                const data = await response.json();
                console.log("notifications==>", data);
                setNotifications(data.reverse());
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };
        async function fetchOffer() {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await fetch(
                `http://localhost:8080/api/img/offertoUser?userId=${token.userId}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            setOffers(data?.filter(offer => offer?.shop?.status === "OPEN"));
        }
        fetchOffer();
        if (role === "SELLER") {
            fetchNotifications();
        }
    }, []);
    return (
        <>
            <div className="bg-white poppins z-50 flex items-center justify-between px-12 py-6 top-0 sticky shadow-2xl scroll-smooth">
                <div>
                    <h1 className="text-5xl font-semibold croissant">
                        <Link to="/home">
                            Local Store
                        </Link>
                    </h1>
                </div>
                <div>
                    <ul className="flex w-full justify-between items-center gap-8">
                        <li>
                            <NavLink to='/shop'>
                                Shop
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/orders'>Orders</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/offers'}>
                                <Badge badgeContent={offers.length} color="success">
                                    Offers
                                </Badge>
                            </NavLink>
                        </li>
                        {role !== "SELLER" && <li>
                            <NavLink to={'/seller'}>Explore as Seller</NavLink>
                        </li>}
                        <li>
                            <NavLink to={'/contact'}>Contact Us</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/profile'}>Profile</NavLink>
                        </li>
                        {role === "SELLER" && <li>
                            <NavLink to={'/notification'}><Badge badgeContent={notifications.length} color="success">
                                <svg className=" rounded-full -m-2" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M13 3a1 1 0 1 0-2 0v.75h-.557A4.214 4.214 0 0 0 6.237 7.7l-.221 3.534a7.377 7.377 0 0 1-1.308 3.754a1.617 1.617 0 0 0 1.135 2.529l3.407.408V19a2.75 2.75 0 1 0 5.5 0v-1.075l3.407-.409a1.617 1.617 0 0 0 1.135-2.528a7.376 7.376 0 0 1-1.308-3.754l-.221-3.533a4.214 4.214 0 0 0-4.206-3.951H13zm-2.25 16a1.25 1.25 0 1 0 2.5 0v-.75h-2.5z" clipRule="evenodd" /></svg>
                            </Badge></NavLink>
                        </li>}
                        <li>
                            <button onClick={logout} className="bg-red-600 py-2 px-8 text-white pb-3 rounded-3xl hover:bg-red-700  active:bg-red-600">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Navbar;