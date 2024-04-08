import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageModal from './ImageModal';
function order({ order, index }) {
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            <Accordion elevation={2} defaultExpanded={!index} key={order?.shopId} sx={{
                [`&:before`]: { display: "none" }, width: "75%", marginX: "auto !important"
            }}>
                <div className=" bg-gray-200 items-center justify-between py-3 px-6">
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: "26px" }} />} sx={{ display: "flex", '& .MuiAccordionSummary-content': { display: "flex", alignItems: "center", justifyContent: "space-between", } }}>
                        <div className="flex items-center justify-between gap-12">
                            <div>
                                <h4 className="font-semibold ">Order Number</h4><span>{order?.shopId}</span>
                            </div>
                            <div>
                                <h4 className="font-semibold">Product Name</h4><span>{order?.productName ?? "Name Here!"}</span>
                            </div>
                            <div>
                                <h4 className="font-semibold">Date Placed</h4><span>{order?.orderTime ?? "date here"}</span>
                            </div>
                        </div>
                        <div>
                            <span className={`grid me-8 items-center w-fit whitespace-nowrap rounded-full border-2  py-1 px-4 font-sans text-xs font-bold uppercase ${order?.status === "OPEN" ? 'border-blue-800 text-blue-800' : order?.status === "IN_PROGRESS" ? 'border-themeColor-400 text-themeColor-400' : 'border-green-800 text-green-800'} `}>{order?.status === "IN_PROGRESS" ? "IN PROGRESS" : order?.status}</span>
                        </div>
                    </AccordionSummary>
                </div>
                <AccordionDetails>
                    <div className="py-3 px-6 flex justify-between gap-6">
                        <div className="max-w-64 max-h-64">
                            <img onClick={() => setOpen(true)} className="object-contain cursor-pointer rounded-lg drop-shadow-2xl shadow-xl " src={`data:image/jpeg;base64,${order?.photo}`} alt="" />
                            {isOpen && (
                                <ImageModal
                                    src={`data:image/jpeg;base64,${order?.photo}`}
                                    toggleModal={setOpen}
                                />
                            )}
                        </div>
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <h6 className="font-medium">Category: <span className="font-normal">{order?.categories}</span></h6>
                                <h6 className="font-medium">Price: <span className="font-normal">{order?.price || "No offer accepted yet!"}</span></h6>
                            </div>
                            <div className="mt-2">
                                <span>{order?.description}</span>
                            </div>
                            <div className="mt-8">
                                <h6 className="font-medium">Delivery Address: {" "} <span className="font-normal">{order?.user?.address}</span></h6>
                            </div>
                        </div>
                    </div>
                    <div className="mx-6 mt-6">
                        <span className={`${order?.status === "OPEN" ? 'text-blue-800' : order?.status === "IN_PROGRESS" ? ' text-themeColor-400' : ' text-green-800'}`}>{order?.status === "OPEN" ? 'Your order is still open !' : order?.status === "IN_PROGRESS" ? "Your order is in progress, it'll be shortly delivered !" : 'Your order is successfully delivered'}</span>
                    </div>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default order