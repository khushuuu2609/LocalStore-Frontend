import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Offer from "./components/Offer"
import Loader from "../Loader";

function BuyerNotifications() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false)
    const [refresh, setrefresh] = useState(false)
    const token = JSON.parse(localStorage.getItem("token"));
    const filterOffer = offers.filter(offer => offer?.shop?.status === "OPEN")

    useEffect(() => {
        async function fetchOffer() {
            setLoading(true)
            const response = await fetch(
                `http://localhost:8080/api/img/offertoUser?userId=${token.userId}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            console.log(data);
            setOffers(data);
            setTimeout(() => {
                setLoading(false)
            }, 200);
        }
        fetchOffer();
    }, [refresh]);

    async function acceptOffer(e) {
        //
        if (confirm("Are you sure you want to accept this offer!")) {
            //
            const index = parseInt(e.target.id);
            const filterOffer = offers.filter(offer => offer?.shop?.status === "OPEN")
            const acceptedOffer = filterOffer[index];
            console.log(acceptedOffer.shop.shopId);
            try {
                setLoading(true)
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
                setrefresh(prev => !prev)
                setLoading(false)
            } catch (e) {
                toast.error("Something went wrong!");
            }
        } else return;
    }

    if (filterOffer.length < 1) {
        return (
            <>
                <h1 className="text-5xl text-center text-themeColor-400 font-semibold mt-28">Offers Not Available</h1>
            </>
        )
    }
    if (loading) {
        return <Loader />
    }
    return (
        <>
            <div className="px-12">
                <div className="w-9/12 mx-auto mt-8">
                    <div><h2 className="text-themeColor-400 text-4xl font-bold">Offers</h2></div>
                    <div></div>
                </div>
                <div className="flex flex-col justify-center gap-6 my-12">
                    {offers.filter(offer => offer?.shop?.status === "OPEN").map((notification, index) => {
                        if (notification?.shop?.status === "OPEN") {
                            return (
                                <Offer key={notification?.offer_id} index={index} notification={notification} acceptOffer={acceptOffer} />
                            )
                        }
                    })}
                </div>

            </div>
        </>
    );
}

export default BuyerNotifications;