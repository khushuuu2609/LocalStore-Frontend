import React from 'react';

function PaymentPage() {
    return (
        <div className="container">
            <h2>Payment Page</h2>
            <form>
                <div className="mb-3">
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="online"
                        />
                        Pay Online
                    </label>
                </div>
                <div className="mb-3">
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="cashOnDelivery"
                        />
                        Cash on Delivery
                    </label>
                </div>
                <button type="submit">Proceed to Payment</button>
            </form>
        </div>
    );
}

export default PaymentPage;
