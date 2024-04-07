import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageModal from './ImageModal';
function Offer({ notification, index, acceptOffer }) {

    const [isOpen1, setOpen1] = useState(false)
    const [isOpen2, setOpen2] = useState(false)

    return (
        <>
            <Accordion elevation={2} defaultExpanded={!index} key={notification.offer_id} sx={{
                [`&:before`]: { display: "none" }, width: "75%", marginX: "auto !important"
            }}>
                <div className=" bg-gray-200 items-center justify-between py-3 px-6">
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: "26px" }} />} sx={{ display: "flex", '& .MuiAccordionSummary-content': { display: "flex", alignItems: "center", justifyContent: "space-between", } }}>
                        <div className="flex items-center justify-between gap-12">
                            <div>
                                <h4 className="font-semibold">Order Number</h4><span>{notification?.shop.shopId ?? "date here"}</span>
                            </div>
                            <div>
                                <h4 className="font-semibold">Offered By</h4><span>{notification?.seller?.user?.username ?? "date here"}</span>
                            </div>
                            <div>
                                <h4 className="font-semibold">Product Name</h4><span>{notification?.shopId?.name ?? "Name Here!"}</span>
                            </div>
                            <div>
                                <h4 className="font-semibold">Date Placed</h4><span>{notification?.shopId?.date ?? "date here"}</span>
                            </div>
                        </div>

                    </AccordionSummary>
                </div>
                <AccordionDetails>
                    <div className="px-6 flex justify-between items-center">
                        <h6 className="font-medium">Category: <span className="font-normal">{notification?.categories}</span></h6>
                        <h6 className="font-medium">For More Queries: <span className="font-normal text-themeColor-400 cursor-pointer"><a href={`mailto:${notification?.seller?.user?.email}`}>{notification?.seller?.user?.email}</a></span></h6>
                    </div>
                    <div className=" grid grid-cols-3 items-center justify-items-center w-9/12 m-auto my-4">
                        <div className="max-w-64 max-h-64">
                            <img onClick={() => setOpen1(true)} className="object-contain cursor-pointer max-h-64 rounded-lg drop-shadow-2xl shadow-xl " src={`data:image/jpeg;base64,${notification?.shop?.photo}`} alt="" />
                            {isOpen1 && <ImageModal src={`data:image/jpeg;base64,${notification?.shop?.photo}`} toggleModal={setOpen1} />}
                        </div>
                        <div>
                            <svg width="150" height="100" viewBox="0 0 61 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.992 1.73042C41.828 2.89442 41.827 4.78143 42.992 5.94643L44.819 7.77342C46.696 9.65142 45.366 12.8614 42.711 12.8614H28.355C26.709 12.8614 25.374 14.1964 25.374 15.8424V15.8454C25.374 17.4914 26.709 18.8264 28.355 18.8264H42.709C45.365 18.8264 46.695 22.0374 44.817 23.9154L42.992 25.7404C41.828 26.9044 41.828 28.7914 42.992 29.9554L42.993 29.9564C44.157 31.1204 46.044 31.1204 47.209 29.9564L59.215 17.9514C60.379 16.7874 60.379 14.8994 59.215 13.7354L47.207 1.73042C46.043 0.566422 44.156 0.566422 42.992 1.73042Z" fill="#FB9B00" />
                                <path d="M13.871 18.8263H17.307C18.954 18.8263 20.289 17.4913 20.289 15.8443C20.289 14.1973 18.954 12.8623 17.307 12.8623H13.871C12.224 12.8623 10.889 14.1973 10.889 15.8443C10.889 17.4913 12.224 18.8263 13.871 18.8263Z" fill="#FB9B00" />
                                <path d="M2.66499 18.8263H3.09599C4.34499 18.8263 5.35699 17.8143 5.35699 16.5653V15.1233C5.35699 13.8743 4.34499 12.8623 3.09599 12.8623H2.66499C1.41599 12.8623 0.403992 13.8743 0.403992 15.1233V16.5653C0.402992 17.8143 1.41599 18.8263 2.66499 18.8263Z" fill="#FB9B00" />
                            </svg>
                        </div>
                        <div className="max-w-64 max-h-64">
                            <img onClick={() => setOpen2(true)} className="object-cover cursor-pointer max-h-64 rounded-lg drop-shadow-2xl shadow-xl " src={`data:image/jpeg;base64,${notification?.photo}`} alt="" />
                            {isOpen2 && <ImageModal src={`data:image/jpeg;base64,${notification?.photo}`} toggleModal={setOpen2} />}
                        </div>
                        <span className="text-center block mt-8 mb-6">Requested Product</span>
                        <div></div>
                        <span className="text-center block mt-8 mb-6">Available Product</span>
                    </div>
                    <div className="px-6">
                        <h6 className="font-medium">Description by Seller: <span className="font-normal">{notification?.description}</span></h6>
                        <h6 className="font-medium">Offered Price: <span className="font-normal text-themeColor-400">{notification?.price} Rs. </span></h6>
                    </div>
                    <div className="px-6 mt-6">
                        <button id={index}
                            onClick={acceptOffer} className="bg-green-500 py-2 px-8 text-white rounded-3xl hover:bg-green-700  active:bg-green-600 transition-all duration-500">Accept Offer</button>
                    </div>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default Offer