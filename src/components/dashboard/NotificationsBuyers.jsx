import React from 'react';

function BuyerNotifications() {
    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Notifications</h2>
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <h5 className="card-title">New Offer Available</h5>
                    <p className="card-text">Seller XYZ has offered a discount on product ABC. Check it out!</p>
                    <a href="#" className="btn btn-primary">View Offer</a>
                </div>
            </div>
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <h5 className="card-title">Order Confirmed</h5>
                    <p className="card-text">Your order for product DEF has been confirmed. It will be delivered soon.</p>
                    <a href="#" className="btn btn-primary">Track Order</a>
                </div>
            </div>
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <h5 className="card-title">Order Delivered</h5>
                    <p className="card-text">Your order for product GHI has been delivered. Rate your experience.</p>
                    <a href="#" className="btn btn-primary">Rate Now</a>
                </div>
            </div>
            {/* Add more notifications as needed */}
        </div>
    );
}

export default BuyerNotifications;
