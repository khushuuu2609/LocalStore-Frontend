import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import OfferForm from "./OfferForm";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [offerdata, sendData] = useState({});
    const [refresh, setrefresh] = useState(false);
    const token = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
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
                setNotifications(data.reverse());
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
                            <Accordion elevation={2} defaultExpanded={!index} key={notification.notifyId} sx={{
                                [`&:before`]: { display: "none" }, width: "75%", marginX: "auto !important"
                            }}>
                                <div className=" bg-gray-200 items-center justify-between py-3 px-6">
                                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: "26px" }} />} sx={{ display: "flex", '& .MuiAccordionSummary-content': { display: "flex", alignItems: "center", justifyContent: "space-between", } }}>
                                        <div className="flex items-center justify-between gap-12">
                                            <div>
                                                <h4 className="font-semibold">Product Name</h4><span>{notification?.shopId?.name ?? "Name Here!"}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Customer Name</h4><span>{notification?.user?.username ?? "date here"}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">Date Placed</h4><span>{notification?.shopId?.date ?? "date here"}</span>
                                            </div>
                                        </div>

                                    </AccordionSummary>
                                </div>
                                <AccordionDetails>
                                    <div className="py-3 px-6 flex justify-between gap-6">
                                        <div className="max-w-64 max-h-64">
                                            <img className="object-contain rounded-lg drop-shadow-2xl shadow-xl " src={`data:image/jpeg;base64,${notification?.photo}`} alt="" />
                                        </div>
                                        <div className="w-full">
                                            <div className="flex items-center justify-between">
                                                <h6 className="font-medium">Category: <span className="font-normal">{notification?.categories}</span></h6>
                                            </div>
                                            <div className="mt-2">
                                                <span>{notification?.description}</span>
                                            </div>
                                            <div className="mt-8">
                                                <h6 className="font-medium">Delivery Address: {" "} <span className="font-normal">{notification?.user?.address}</span></h6>
                                            </div>
                                            <div className="mt-0">
                                                <h6 className="font-medium">Customer Email: {" "} <span className="font-normal text-themeColor-400 cursor-pointer"><a href={`mailto:${notification?.user?.email}`}>{notification?.user?.email}</a></span></h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mx-6 mt-6">
                                        {notification?.shopId?.status === "OPEN" ? (
                                            <button
                                                onClick={() => {
                                                    setShowForm(true);
                                                    sendData(notification);
                                                }}
                                                className="bg-green-500 py-2 px-8 text-white rounded-3xl hover:bg-green-700  active:bg-green-600 transition-all duration-500"
                                            >
                                                Give Offer
                                            </button>
                                        ) : notification?.shopId?.status ===
                                            "IN_PROGRESS" ? (
                                            <button
                                                id={notification.shopId.shopId}
                                                onClick={deliver}
                                                className="bg-green-500 py-2 px-8 text-white rounded-3xl hover:bg-green-700  active:bg-green-600 transition-all duration-500"
                                            >
                                                Deliver
                                            </button>
                                        ) : (
                                            <p className="text-green-700">
                                                Order delivered ✔
                                            </p>
                                        )}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
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
