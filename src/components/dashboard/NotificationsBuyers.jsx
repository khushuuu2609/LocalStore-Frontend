import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function BuyerNotifications() {
    const [offers, setOffers] = useState([]);
    const token = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        async function fetchOffer() {
            const response = await fetch(
                `http://localhost:8080/api/img/offertoUser?userId=${token.userId}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            console.log(data);
            setOffers(data);
        }
        fetchOffer();
    }, []);

    async function acceptOffer(e) {
        //
        if (confirm("Are you sure you want to accept this offer!")) {
            //
            const index = parseInt(e.target.id);
            const acceptedOffer = offers[index];
            console.log(acceptedOffer.shop.shopId);
            try {
                const res = await fetch(
                    `http://localhost:8080/api/img/${acceptedOffer.shop.shopId}/price?price=${acceptedOffer.price}`,
                    {
                        method: "PUT",
                    }
                );
                const ChangeStatus = await fetch(
                    `http://localhost:8080/api/img/status/${acceptedOffer.shop.shopId}?newStatus=IN_PROGRESS`,
                    {
                        method: "PUT",
                    }
                );
                const deleteOffers = await fetch(
                    `http://localhost:8080/api/img/deleteAllExceptOne?shopId=${acceptedOffer.shop.shopId}&offerId=${acceptedOffer.offer_id}`,
                    {
                        method: "DELETE",
                    }
                );
                const data = await deleteOffers.text();
                console.log(data);
                toast.success("Offer Accepted successfully!");
            } catch (e) {
                toast.error("Something went wrong!");
            }
        } else return;
    }

    return (
        <div className="container min-vh-100 py-5 mt-5">
            <h2 className="text-center mb-4 mt-5">Offer Notifications</h2>
            {offers.map((order, index) => {
                return (
                    <div
                        key={order.offer_id}
                        className="card card-stepper mb-5"
                        style={{ borderRadius: "16px" }}
                    >
                        <div className="card-header p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted mb-2">
                                        {" "}
                                        Offer No.{" "}
                                        <span className="fw-bold text-body">
                                            {index + 1}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-4">
                            <div className="d-flex flex-row mb-4 pb-2">
                                <div className="flex-fill">
                                    <h3>{order.description}</h3>
                                    <h4>category:- {order.categories}</h4>
                                    <h5>price:- {order.price}</h5>
                                </div>
                                <div>
                                    <img
                                        className="align-self-center img-fluid"
                                        src={`data:image/jpeg;base64,${order.photo}`}
                                        width="250"
                                        alt="Product"
                                    />
                                </div>
                            </div>
                            <button
                                id={index}
                                onClick={acceptOffer}
                                className="btn btn-primary"
                            >
                                Accept Offer
                            </button>
                        </div>
                    </div>
                );
            })}
            {/* Add more notifications as needed */}
        </div>
    );
}

export default BuyerNotifications;
