import React from 'react'

function Navbar() {
    return (
        <div>
            <div className="container-fluid fixed-top navbarclour ">

                <div className="container px-0 ">
                    <nav className="navbar navbar-light navbar-expand-xl  ">
                        <a href="index.html" className="navbar-brand"><h1 className="display-6">Local Store</h1></a>
                        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav mx-auto ">
                                <a href="index.html" className="nav-item nav-link active"><b>Home</b></a>
                                <a href="Shop.jsx" className="nav-item nav-link"><b>Shop</b></a>
                                <a href="shop-detail.html" className="nav-item nav-link"><b>Orders</b></a>
                                <a href="contact.html" className="nav-item nav-link"><b>Explore as Seller</b></a>
                                <a href="contact.html" className="nav-item nav-link"><b>Contact Us</b></a>
                            </div>
                            <div className="d-flex m-3 me-0">
                                <a href="#" className="position-relative me-4 my-auto">
                                    <i className="fa fa-shopping-bag fa-2x"></i>
                                    <span className="position-absolute bg-danger rounded-circle d-flex align-items-center justify-content-center text-white px-1" style={{ top: '-5px', left: '15px', height: '20px', minWidth: '20px' }}>3</span>
                                </a>
                                <a href="#" className="my-auto">
                                    <i className="fas fa-user fa-2x"></i>
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            
        </div>
    )
}

export default Navbar
