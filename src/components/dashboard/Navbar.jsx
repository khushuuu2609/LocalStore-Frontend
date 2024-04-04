import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
    const { role } = JSON.parse(localStorage.getItem("token"));
    return (
        <>
            <div className="container-fluid fixed-top navbarclour ">
                <div className="container px-0 ">
                    <nav className="navbar navbar-light navbar-expand-xl  ">
                        <a href="index.html" className="navbar-brand">
                            <h1 className="display-6">Local Store</h1>
                        </a>
                        <button
                            className="navbar-toggler py-2 px-3"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse"
                        >
                            <span className="fa fa-bars"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarCollapse"
                        >
                            <div className="navbar-nav mx-auto ">
                                <NavLink
                                    to="home"
                                    className="nav-item nav-link"
                                >
                                    <b>Home</b>
                                </NavLink>
                                <NavLink
                                    to="shop"
                                    className="nav-item nav-link"
                                >
                                    <b>Shop</b>
                                </NavLink>
                                <NavLink
                                    to="orders"
                                    className="nav-item nav-link"
                                >
                                    <b>Orders</b>
                                </NavLink>
                                <NavLink
                                    to="offers"
                                    className="nav-item nav-link"
                                >
                                    <b>Offers</b>
                                </NavLink>
                                {role !== "SELLER" && (
                                    <NavLink
                                        to="seller"
                                        className="nav-item nav-link"
                                    >
                                        <b>Explore as Seller</b>
                                    </NavLink>
                                )}
                                <NavLink
                                    to="contact"
                                    className="nav-item nav-link"
                                >
                                    <b>Contact Us</b>
                                </NavLink>
                            </div>
                            <div className="d-flex m-3 me-0">
                                {role === "SELLER" && (
                                    <NavLink
                                        to="/notification"
                                        className="position-relative me-4 my-auto"
                                    >
                                        <i className="fa fa-bell fa-2x text-dark"></i>
                                        <span
                                            className="position-absolute bg-danger rounded-circle d-flex align-items-center justify-content-center text-white px-1"
                                            style={{
                                                top: "-5px",
                                                left: "15px",
                                                height: "20px",
                                                minWidth: "20px",
                                            }}
                                        >
                                            3
                                        </span>
                                    </NavLink>
                                )}
                                <NavLink to="/profile" className="my-auto">
                                    <i className="fas fa-user fa-2x text-dark"></i>
                                </NavLink>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Navbar;
