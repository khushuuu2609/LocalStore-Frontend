import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import OfferForm from "./OfferForm";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [offerdata, sendData] = useState({});
    const [refresh, setrefresh] = useState(false);
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

    async function deliver(e) {
        if (
            confirm("Do you want to update status to deliver for this order?")
        ) {
            const id = e.target.id;
            const ChangeStatus = await fetch(
                `http://localhost:8080/api/img/status/${id}?newStatus=DELIVERED`,
                {
                    method: "PUT",
                }
            );
            toast.success("Order status changed to Deliver!");
        }
        setrefresh((prev) => !prev);
    }
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
                            {notification?.shopId?.status === "OPEN" ? (
                                <button
                                    onClick={() => {
                                        setShowForm(true);
                                        sendData(notification);
                                    }}
                                    className="btn btn-primary"
                                >
                                    Give Offer
                                </button>
                            ) : notification?.shopId?.status ===
                              "IN_PROGRESS" ? (
                                <button
                                    id={notification.shopId.shopId}
                                    onClick={deliver}
                                    className="btn btn-primary"
                                >
                                    Deliver
                                </button>
                            ) : (
                                <p className="text-success">
                                    Order delivered ✔
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {showForm && (
                <OfferForm offerId={offerdata} formState={setShowForm} />
            )}
        </div>
    );
}
export default Notifications;
