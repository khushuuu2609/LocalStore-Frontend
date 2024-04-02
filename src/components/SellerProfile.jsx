import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import categories from "../service/categories";
import { useNavigate } from "react-router-dom";
function SellerProfile() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const form = useRef(null);
    const [error, setError] = useState(null);

    const userToken = JSON.parse(localStorage.getItem("token"));
    function logout() {
        localStorage.clear();
        navigate("/");
    }

    useEffect(() => {
        const fetchUser = async () => {
            let response = await fetch(
                `http://localhost:8080/api/auth/seller/${userToken.userId}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            setUser(data);
            console.log(data);
        };
        fetchUser();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(form.current);
        const User = Object.fromEntries(formData.entries());

        if (formData.getAll("categories").length > 1) {
            User.categories = formData.getAll("categories");
        }
        console.log(user, User);
        const response = await fetch(
            `http://localhost:8080/api/auth/seller/${userToken.userId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...user, ...User }),
            }
        );
        const data = await response.text();
        setUser({ ...user, ...User });
        if (data?.error) {
            setError(data.error);
            return;
        }
        toast.success("Profile updated  successfully!");
        form.current.reset();
    }

    return (
        <div className="container rounded bg-white mt-5 mb-5 ">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-3 home-layout">
                        <img
                            className="rounded-circle mt-5"
                            width="150px"
                            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                            alt="Profile"
                        />
                        <span className="font-weight-bold">
                            {user?.user?.username}
                        </span>
                        <span className="text-black-50">
                            {user?.user?.email}
                        </span>
                        <button
                            className="btn btn-danger"
                            type="button"
                            onClick={logout}
                        >
                            logout
                        </button>
                    </div>
                </div>
                <div className="col-md-5 border-right home-layout card-bg w-50 vh-90">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="text-right ">Profile Settings</h3>
                        </div>
                        <form onSubmit={handleSubmit} ref={form}>
                            <div className="row mt-2">
                                <div className="col-md-12 mb-3">
                                    <div className="form-group">
                                        <label className="labels text-dark font-weight-bold">
                                            UserName
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            placeholder="first name"
                                            defaultValue={user?.user?.username}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <div className="form-group">
                                        <label className="labels text-dark font-weight-bold">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            defaultValue={user?.user?.email}
                                            placeholder="email"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-12 mb-3">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="categories"
                                            className="form-label"
                                        >
                                            Category
                                        </label>
                                        <select
                                            className="form-select"
                                            id="categories"
                                            name="categories"
                                            multiple
                                        >
                                            {categories.map((data, id) => (
                                                <option key={id} value={data}>
                                                    {data}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="description"
                                            className="form-label"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            rows="3"
                                            defaultValue={user.description}
                                        ></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="area"
                                            className="form-label"
                                        >
                                            Area
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="areaName"
                                            name="area"
                                            defaultValue={user.areaName}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="pincode"
                                            className="form-label"
                                        >
                                            Pincode
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="pincode"
                                            name="pincode"
                                            defaultValue={user.pin_code}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 text-center">
                                    <button
                                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-dark"
                                        type="submit"
                                    >
                                        Save Profile
                                    </button>
                                </div>
                            </div>
                        </form>
                        {/* Rest of the form fields */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerProfile;
