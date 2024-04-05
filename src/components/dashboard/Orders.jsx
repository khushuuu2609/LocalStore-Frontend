import { useEffect, useState } from "react";

function Order() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        async function fetchOrder() {
            const response = await fetch(
                `http://localhost:8080/api/img/shops/${token.userId}`
            );
            const data = await response.json();
            setOrders(data);
        }
        fetchOrder();
    }, []);
    console.log(orders);
    return (
        <section className="">
            <div className="container py-5 h-100 home-layout card-bg">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-10 col-lg-8 col-xl-6">
                        {orders.length < 1 && (
                            <h1 className="text-center">
                                Orders Not Available
                            </h1>
                        )}
                        {orders.map((order) => {
                            return (
                                <div
                                    key={order.shopId}
                                    className="card card-stepper mb-5"
                                    style={{ borderRadius: "16px" }}
                                >
                                    <div className="card-header p-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <p className="text-muted mb-2">
                                                    {" "}
                                                    Order ID{" "}
                                                    <span className="fw-bold text-body">
                                                        {order.shopId}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="d-flex flex-row mb-4 pb-2">
                                            <div className="flex-fill">
                                                <h3>{order.description}</h3>
                                                <h4>
                                                    category:-{" "}
                                                    {order.categories}
                                                </h4>
                                                <h6>
                                                    Price:-{" "}
                                                    {order?.price ||
                                                        "No offer accepted yet!"}
                                                </h6>
                                            </div>
                                            <div>
                                                <img
                                                    className="align-self-center img-fluid"
                                                    src={`data:image/jpeg;base64,${order.photo}`}
                                                    width="250"
                                                    alt="Product"
                                                />
                                            </div>
                                        </div>
                                        <ul
                                            id="progressbar-1"
                                            className="mx-0 mt-0 mb-5 px-0 pt-0 pb-4"
                                        >
                                            <li
                                                className={`step0 ${
                                                    order.status === "OPEN" ||
                                                    order.status ===
                                                        "IN_PROGRESS" ||
                                                    order.status === "DELIVERED"
                                                        ? "active fw-bolder fs-5"
                                                        : ""
                                                }`}
                                                id="step1"
                                            >
                                                <span
                                                    style={{
                                                        marginLeft: "22px",
                                                        marginTop: "12px",
                                                    }}
                                                >
                                                    OPEN
                                                </span>
                                            </li>
                                            <li
                                                className={`step0 text-center ${
                                                    order.status ===
                                                        "IN_PROGRESS" ||
                                                    order.status === "DELIVERED"
                                                        ? "active fw-bolder fs-5"
                                                        : ""
                                                }`}
                                                id="step2"
                                            >
                                                <span>IN PROCESS</span>
                                            </li>
                                            <li
                                                className={`step0 text-end ${
                                                    order.status === "DELIVERED"
                                                        ? "active fw-bolder fs-5"
                                                        : ""
                                                }`}
                                                id="step3"
                                            >
                                                <span
                                                    style={{
                                                        marginRight: "22px",
                                                    }}
                                                >
                                                    DELIVERED
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Order;
