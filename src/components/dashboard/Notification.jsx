import React from 'react';

function Notifications() {
    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Notifications</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">New Order Received</h5>
                    <p className="card-text">You have a new order for product XYZ. Please review and process the order.</p>
                    <a href="#" className="btn btn-primary">View Order</a>
                </div>
            </div>
            <div className="card mt-3">
                <div className="card-body">
                    <h5 className="card-title">Product Out of Stock</h5>
                    <p className="card-text">Product ABC is out of stock. Please update your inventory.</p>
                    <a href="#" className="btn btn-primary">Update Inventory</a>
                </div>
            </div>
            {/* Add more notifications as needed */}
        </div>
    );
}

export default Notifications;
