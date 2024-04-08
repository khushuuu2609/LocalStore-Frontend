import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageModal from '../components/ImageModal'
function Notification({ index, notification, setShowForm, deliver, sendData }) {
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            <Accordion elevation={2} defaultExpanded={!index} key={notification.notifyId} sx={{
                [`&:before`]: { display: "none" }, width: "75%", marginX: "auto !important"
            }}>
                <div className=" bg-gray-200 items-center justify-between py-3 px-6">
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: "26px" }} />} sx={{ display: "flex", '& .MuiAccordionSummary-content': { display: "flex", alignItems: "center", justifyContent: "space-between", } }}>
                        <div className="flex items-center justify-between gap-12 w-full" >
                            <div className="flex items-center justify-between gap-12" >
                                <div>
                                    <h4 className="font-semibold">Product Name</h4><span>{notification?.shopId?.productName ?? "Name Here!"}</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Customer Name</h4><span>{notification?.user?.username ?? "date here"}</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Date Placed</h4><span>{notification?.shopId?.orderTime ?? "date here"}</span>
                                </div>
                            </div>
                            <div>
                                <span className={`grid me-8 items-center w-fit whitespace-nowrap rounded-full border-2  py-1 px-4 font-sans text-xs font-bold uppercase ${notification?.shopId?.status === "OPEN" ? 'border-blue-800 text-blue-800' : notification?.shopId?.status === "IN_PROGRESS" ? 'border-themeColor-400 text-themeColor-400' : 'border-green-800 text-green-800'} `}>{notification?.shopId?.status === "IN_PROGRESS" ? "IN PROGRESS" : notification?.shopId?.status}</span>
                            </div>
                        </div>

                    </AccordionSummary>
                </div>
                <AccordionDetails>
                    <div className="py-3 px-6 flex justify-between gap-6">
                        <div className="max-w-64 max-h-64">
                            <img onClick={() => setOpen(true)} className="object-contain cursor-pointer rounded-lg drop-shadow-2xl shadow-xl " src={`data:image/jpeg;base64,${notification?.photo}`} alt="" />
                            {isOpen && <ImageModal src={`data:image/jpeg;base64,${notification?.photo}`} toggleModal={setOpen} />}
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
        </>
    )
}

export default Notification