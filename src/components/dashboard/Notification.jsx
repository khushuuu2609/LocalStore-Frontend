import React from 'react';

function Notifications() {
    return (
        <div className="container py-5 home-layout">
            <h2 className="text-center mb-4">Notifications</h2>
            <div className="card">
                <div className="card-body card-bg">
                    <h5 className="card-title">New Order Received</h5>
                    <p className="card-text">You have a new order for product XYZ. Please review and process the order.</p>
                    <a href="#" className="btn btn-primary">View Offers</a>
                </div>
            </div>
        </div>
    );
}

export default Notifications;
