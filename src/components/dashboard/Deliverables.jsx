import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Deliverable from "./components/Deliverable";
import Loader from "../Loader";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useSearchParams } from "react-router-dom";
function Deliverables() {
    const [loading, setLoading] = useState(false);
    const [refresh, setrefresh] = useState(false);
    const [orders, setOrders] = useState([]);
    const [params, setParams] = useSearchParams();
    const orderData = useRef([]);
    const form = useRef(null);
    const orderBuffer = useRef(null);
    const [alignment, setAlignment] = useState("");
    const token = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        const searchData = params.get("search");
        console.log(searchData);
        if (searchData) {
            setOrders(
                orderBuffer.current?.flag === "filter"
                    ? orderBuffer.current?.data.filter((order) =>
                          order?.shop?.productName
                              .trim()
                              .toLowerCase()
                              .includes(searchData.trim().toLowerCase())
                      )
                    : orderData.current.filter((order) =>
                          order?.shop?.productName
                              .trim()
                              .toLowerCase()
                              .includes(searchData.trim().toLowerCase())
                      )
            );
        }
    }, [params]);
    function handleSearch(e) {
        e.preventDefault();
        const formData = new FormData(form.current);
        const search = formData.get("search").trim();
        setParams(`search=${search}`);
    }
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        setParams();
        form.current?.reset();
        switch (newAlignment) {
            case "OPEN":
            case "IN_PROGRESS":
            case "DELIVERED":
                setOrders(
                    orderBuffer.current?.flag === "search"
                        ? orderBuffer.current.data.filter(
                              (order) => order?.shop?.status === newAlignment
                          )
                        : orderData.current.filter(
                              (order) => order?.shop?.status === newAlignment
                          )
                );
                orderBuffer.current = {
                    flag: "filter",
                    data: orderData.current.filter(
                        (order) => order?.status === newAlignment
                    ),
                };
                break;
            default:
                setOrders(orderData.current);
                orderBuffer.current = null;
                break;
        }
    };
    useEffect(() => {
        async function getData() {
            setLoading(true);
            const res = await fetch(
                `http://localhost:8080/api/deliverables/seller/${token.sellerId}`,
                {
                    method: "GET",
                }
            );
            const data = await res.json();
            data.reverse();
            orderData.current = data;
            setOrders(data);
            setLoading(false);
        }
        getData();
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
        return <Loader />;
    }
    return (
        <div className="px-12">
            <div className="w-9/12 mx-auto mt-8">
                <div>
                    <h2 className="text-themeColor-400 text-4xl font-bold">
                        Your Workplace
                    </h2>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <form
                        ref={form}
                        className="flex items-center max-w-sm my-2"
                        onSubmit={handleSearch}
                    >
                        <label htmlFor="simpleSearch" className="sr-only">
                            Search
                        </label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-slate-600"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="simpleSearch"
                                name="search"
                                className="bg-gray-50 border border-slate-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
                                placeholder="Search ..."
                                required
                            />
                        </div>
                        <div className="flex items-center">
                            <button
                                type="submit"
                                className="p-3 ms-2 text-sm font-medium text-white bg-slate-600 rounded-lg border border-slate-500 hover:bg-slate-700 focus:ring-2 focus:outline-none focus:ring-slate-300"
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                            <button
                                type="reset"
                                onClick={() => {
                                    setOrders(
                                        orderBuffer.current?.flag == "filter"
                                            ? orderBuffer.current?.data
                                            : orderData.current
                                    );
                                    setParams();
                                }}
                                className="p-3 text-neutral-900 ms-2 border rounded-lg w-32 bg-red-400 font-normal text-sm hover:bg-red-300 focus:ring-2 focus:outline-none focus:ring-slate-300"
                            >
                                Clear Search
                            </button>
                        </div>
                    </form>
                    <ToggleButtonGroup
                        color={"warning"}
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="IN_PROGRESS">
                            IN PROGRESS
                        </ToggleButton>
                        <ToggleButton value="DELIVERED">DELIVERED</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
            <div className="flex flex-col justify-center gap-6 my-12">
                {orders.map((notification, index) => {
                    return (
                        <Deliverable
                            key={notification.deliverablesId}
                            index={index}
                            deliver={deliver}
                            order={notification}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Deliverables;
