import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Offer from "./components/Offer";
import Loader from "../Loader";

function BuyerNotifications() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setrefresh] = useState(false);
    const token = JSON.parse(localStorage.getItem("token"));
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState("none");
    const dataBuffer = useRef(null);
    console.log("this is offers", offers);
    useEffect(() => {
        async function fetchOffer() {
            setLoading(true);
            const response = await fetch(
                `http://localhost:8080/api/img/offertoUser?userId=${token.userId}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            console.log(data);
            data.reverse();
            dataBuffer.current = data.filter(
                (offer) => offer?.shop?.status === "OPEN"
            );
            setOffers(data.filter((offer) => offer?.shop?.status === "OPEN"));
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
        fetchOffer();
    }, [refresh]);

    async function acceptOffer(e) {
        //
        if (confirm("Are you sure you want to accept this offer!")) {
            //
            const index = parseInt(e.target.id);
            const acceptedOffer = offers[index];
            console.log(acceptedOffer);
            console.log(acceptedOffer.shop.shopId);
            try {
                setLoading(true);
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
                const deleteNotification = await fetch(
                    `http://localhost:8080/api/deleteByShopId/${acceptedOffer?.shop?.shopId}`,
                    {
                        method: "DELETE",
                    }
                );
                const deliverables = await fetch(
                    `http://localhost:8080/api/deliverables/save?userId=${token.userId}&shopId=${acceptedOffer?.shop?.shopId}&sellerId=${acceptedOffer?.seller?.sellerId}&offerId=${acceptedOffer?.offer_id}`,
                    {
                        method: "GET",
                    }
                );
                toast.success("Offer Accepted successfully!");
                setrefresh((prev) => !prev);
                setLoading(false);
            } catch (e) {
                console.log(e);
                toast.error("Something went wrong!");
            }
        } else return;
    }

    if (offers?.length < 1) {
        return (
            <>
                <h1 className="text-5xl text-center text-themeColor-400 font-semibold mt-28">
                    Offers Not Available
                </h1>
            </>
        );
    }
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <div className="px-12">
                <div className="w-9/12 mx-auto mt-8">
                    <div>
                        <h2 className="text-themeColor-400 text-4xl font-bold">
                            Offers
                        </h2>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categories" className="block">
                            Select Categories
                        </label>
                        <FormControl sx={{ my: 1, width: "30%" }}>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}
                                value={filter}
                                label="Age"
                                onChange={(event) => {
                                    setFilter(event.target.value);
                                    if (event.target.value === "L2H") {
                                        setOffers((offers) => {
                                            offers.sort(
                                                (a, b) => a.price - b.price
                                            );
                                            console.log(offers);
                                            return offers;
                                        });
                                    } else if (event.target.value == "H2L") {
                                        setOffers((offers) => {
                                            offers.sort(
                                                (a, b) => b.price - a.price
                                            );
                                            console.log(offers);
                                            return offers;
                                        });
                                    } else {
                                        setOffers(dataBuffer.current);
                                    }
                                }}
                                sx={{
                                    "& legend": { display: "none" },
                                    "& fieldset": { top: 0 },
                                    bgcolor: "rgb(243 244 246)",
                                    borderRadius: "0.5rem",
                                    width: "100%",
                                    border: "1px solid rgb(229 231 235)",
                                    outline: "none",
                                }}
                            >
                                <MenuItem value={"none"}>None</MenuItem>
                                <MenuItem value={"L2H"}>
                                    Price - Low To High
                                </MenuItem>
                                <MenuItem value={"H2L"}>
                                    Price - High To Low
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-6 my-12">
                    {offers.map((notification, index) => {
                        if (notification?.shop?.status === "OPEN") {
                            return (
                                <Offer
                                    key={notification?.offer_id}
                                    index={index}
                                    notification={notification}
                                    acceptOffer={acceptOffer}
                                />
                            );
                        }
                    })}
                </div>
            </div>
        </>
    );
}

export default BuyerNotifications;
