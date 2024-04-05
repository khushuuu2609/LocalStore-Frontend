import React from 'react'
import image1 from "../../assets/img/hero-img-1.jpg"
import image2 from "../../assets/img/hero-img-2.png"
import { Link } from 'react-router-dom'


function Hero() {
    return (
        <>
            <div className="container-fluid py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-md-12 col-lg-7">
                            <h4 className="mb-3 text-primary">100% Customer Benefits</h4>
                            <h1 className="mb-5 display-3 ">Empowering Your Buying and Selling Experiences.</h1>
                        </div>
                        <div className="col-md-12 col-lg-5">
                            <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                                <div className="carousel-inner" role="listbox">
                                    <div className="carousel-item active rounded">
                                        <img src={image1} className="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide" />
                                        <Link to="/shop" className="btn px-4 py-2 text-white rounded">Shop</Link>
                                    </div>
                                    <div className="carousel-item rounded">
                                        <img src={image2} className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                        <Link to="/orders" className="btn px-4 py-2 text-white rounded">Orders</Link>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero
