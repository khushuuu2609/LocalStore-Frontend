import { useState, useEffect } from "react";

import axios from "axios";
import OfferForm from "./OfferForm";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const token = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/notifications?userId=${token.userId}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            console.log("notifications==>", data);
            setNotifications(data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };
    return (
        <div className="container py-5 home-layout">
            <h2 className="text-center mb-4">Notifications</h2>
            <div>
                {notifications.map((notification) => (
                    <div key={notification.notifyId} className="card mb-3">
                        <div className="card-body card-bg">
                            <h5 className="card-title">
                                Username: {notification.title}
                            </h5>

                            <img
                                src={`data:image/jpeg;base64,${notification.photo}`}
                                alt="Notification Photo"
                                style={{
                                    maxWidth: "200px",
                                    maxHeight: "200px",
                                }}
                            />
                            <p>Category: {notification.categories}</p>
                            <p className="card-text">
                                Description: {notification.description}
                            </p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="btn btn-primary"
                            >
                                Give Offer
                            </button>
                        </div>
                        {showForm && (
                            <OfferForm
                                offerId={notification}
                                formState={setShowForm}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Notifications;
