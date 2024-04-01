import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
    const form = useRef(null);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(form.current);
        const user = Object.fromEntries(formData.entries());
        user.pin_code = parseInt(user.pin_code);
        // https://api.postalpincode.in/pincode/110001
        const postResponse = await fetch(
            `https://api.postalpincode.in/pincode/${user.pin_code}`
        );
        const postData = await postResponse.json();
        console.log(postData);
        if (postData[0]?.Status === "Error") {
            setError("Wrong Pincode!");
            return;
        }
        user.city = postData[0].PostOffice[0].District;
        const response = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        if (data?.error) {
            setError(data.error);
            return;
        }
        form.current.reset();
    }

    return (
        <>
            <div className="gradient-custom-3">
                <div className="mask d-flex align-items-center form-scale">
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div
                                    className="card"
                                    style={{ borderRadius: "15px" }}
                                >
                                    <div className="card-body px-5">
                                        <h2 className="text-uppercase text-center mb-4">
                                            Create an account
                                        </h2>

                                        <form
                                            onSubmit={handleSubmit}
                                            ref={form}
                                        >
                                            <span className="text-danger mb-3 d-block  fw-bold">
                                                {error}
                                            </span>
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example1cg"
                                                >
                                                    <b>UserName</b>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="form3Example1cg"
                                                    name="username"
                                                    required
                                                    className="form-control form-control-lg border border-4 "
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example3cg"
                                                >
                                                    <b>Your Email</b>
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    id="form3Example3cg"
                                                    name="email"
                                                    className="form-control form-control-lg border border-4 "
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example4cg"
                                                >
                                                    <b>Password</b>
                                                </label>
                                                <input
                                                    type="password"
                                                    required
                                                    id="form3Example4cg"
                                                    name="password"
                                                    className="form-control form-control-lg border border-4 "
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example4cdg"
                                                >
                                                    <b>Repeat Password</b>
                                                </label>
                                                <input
                                                    type="password"
                                                    id="form3Example4cdg"
                                                    name="confirmPassword"
                                                    required
                                                    className="form-control form-control-lg border border-4 "
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example1cgaddress"
                                                >
                                                    <b>Address</b>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    id="form3Example1cgaddress"
                                                    name="address"
                                                    className="form-control border border-4  form-control-lg"
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example1cgarea"
                                                >
                                                    <b>Area</b>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    id="form3Example1cgarea"
                                                    name="areaName"
                                                    className="form-control border border-4  form-control-lg"
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="form3Example1cg2"
                                                >
                                                    <b>Pin Code</b>
                                                </label>
                                                <input
                                                    type="number"
                                                    required
                                                    id="form3Example1cg2"
                                                    name="pin_code"
                                                    className="form-control border border-4  form-control-lg"
                                                />
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                                >
                                                    Register
                                                </button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">
                                                Have an account?
                                                <Link
                                                    className="signin-link"
                                                    to="/signin"
                                                >
                                                    {" "}
                                                    Signin Here!!
                                                </Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;

[
    {
        Message: "Number of pincode(s) found:2",
        Status: "Success",
        PostOffice: [
            {
                Name: "Eru",
                Description: null,
                BranchType: "Branch Post Office",
                DeliveryStatus: "Non-Delivery",
                Circle: "Gujarat",
                District: "Navsari",
                Division: "Navsari",
                Region: "Vadodara",
                Block: "Jalalpore",
                State: "Gujarat",
                Country: "India",
                Pincode: "396450",
            },
            {
                Name: "Eru Ac",
                Description: null,
                BranchType: "Sub Post Office",
                DeliveryStatus: "Delivery",
                Circle: "Gujarat",
                District: "Navsari",
                Division: "Navsari",
                Region: "Vadodara",
                Block: "Jalalpore",
                State: "Gujarat",
                Country: "India",
                Pincode: "396450",
            },
        ],
    },
];
