import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import SellerReg from "./ExplorAsSeller/SellerReg";

function Profile() {
    const [user, setUser] = useState({});
    const userToken = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        const fetchUser = async () => {
            let response = await fetch(
                `http://localhost:8080/api/auth/${userToken.userId}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            console.log(data);
            setUser(data);
        };
        fetchUser();
    }, []);

    const form = useRef(null);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(form.current);
        const user = Object.fromEntries(formData.entries());

        const postResponse = await fetch(
            `https://api.postalpincode.in/pincode/${user.pin_code}`
        );
        const postData = await postResponse.json();
        if (postData[0]?.Status === "Error") {
            setError("Wrong Pincode!");
            return;
        }
        user.city = postData[0].PostOffice[0].District;

        const response = await fetch(
            `http://localhost:8080/api/auth/update/${userToken.userId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            }
        );
        const data = await response.text();
        if (data?.error) {
            setError(data.error);
            return;
        }
        toast.success("Profile updated  successfully!");
        setUser(user);
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
                            {user.username}
                        </span>
                        <span className="text-black-50">{user.email}</span>
                    </div>
                </div>
                <div className="col-md-5 border-right home-layout card-bg w-50 vh-90">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="text-right ">Profile Settings</h3>
                        </div>
                        <span className="text-danger mb-3 d-block  fw-bold">
                            {error}
                        </span>
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
                                            defaultValue={user.username}
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
                                            defaultValue={user.email}
                                            placeholder="email"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-12 mb-3">
                                    <div className="form-group">
                                        <label className="labels text-dark font-weight-bold">
                                            Location
                                        </label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            defaultValue={user.address}
                                            placeholder="Address"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <div className="form-group">
                                        <label className="labels text-dark font-weight-bold">
                                            Pincode
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="pin_code"
                                            defaultValue={user.pin_code}
                                            placeholder="Pincode"
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

export default Profile;
