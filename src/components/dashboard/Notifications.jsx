import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import OfferForm from "./OfferForm";

import Notification from "./components/Notification";
import Loader from "../Loader";
function Notifications() {
    const [loading, setLoading] = useState(false)
    const [notifications, setNotifications] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [offerdata, sendData] = useState({});
    const [refresh, setrefresh] = useState(false);
    const token = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true)
                const response = await fetch(
                    `http://localhost:8080/api/notifications?userId=${token.userId}`,
                    {
                        method: "GET",
                    }
                );
                const data = await response.json();
                console.log("notifications==>", data);
                setNotifications(data.reverse());
                setLoading(false)
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [refresh]);


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
    if (loading) {
        return <Loader />
    }
    return (
        <>
            <div className="px-12">
                <div className="w-9/12 mx-auto mt-8">
                    <div><h2 className="text-themeColor-400 text-4xl font-bold">Notifications</h2></div>
                    <div></div>
                </div>
                <div className="flex flex-col justify-center gap-6 my-12">
                    {notifications.map((notification, index) => {
                        return (
                            <Notification sendData={sendData} key={notification.notifyId} index={index} deliver={deliver} notification={notification} setShowForm={setShowForm} />
                        )
                    })}
                </div>
                {showForm && (
                    <OfferForm offerId={offerdata} formState={setShowForm} />
                )}
            </div>
        </>
    );
}
export default Notifications;
