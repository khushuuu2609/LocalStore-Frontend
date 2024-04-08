import { useEffect, useState } from "react";
import Order from "./components/Order";
import Loader from "../Loader";
function Orders() {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    console.log(orders);
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        async function fetchOrder() {
            setLoading(true);
            const response = await fetch(
                `http://localhost:8080/api/img/shops/${token.userId}`
            );
            const data = await response.json();
            setOrders(data.reverse());
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
        fetchOrder();
    }, []);

    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <div className="px-12">
                <div className="w-9/12 mx-auto mt-8">
                    <div>
                        <h2 className="text-themeColor-400 text-4xl font-bold">
                            Order History
                        </h2>
                    </div>
                    <div></div>
                </div>
                <div className="flex flex-col justify-center gap-6 my-12">
                    {orders.map((order, index) => {
                        return (
                            <Order
                                index={index}
                                order={order}
                                key={order?.shopId}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Orders;
