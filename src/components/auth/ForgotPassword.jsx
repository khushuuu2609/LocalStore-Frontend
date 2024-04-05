import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
    const nav = useNavigate();

    const form = useRef(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(form.current);
        const email = formData.get("email");
        // Add logic to handle the forgot password process
        console.log("Email submitted:", email);
        const res = await fetch(`http://localhost:8080/api/auth/send-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
            credentials: "include",
        });
        nav("/verify-otp", { state: email });
        // Reset the form after submission
        form.current.reset();
    }

    return (
        <div>
            <section className="vh-100 gradient-custom-3">
                <div className="mask d-flex align-items-center h-100 form-scale">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div
                                    className="card"
                                    style={{ borderRadius: "15px" }}
                                >
                                    <div className="card-body px-5">
                                        <h2 className="text-uppercase text-center mb-4">
                                            Forgot Password
                                        </h2>

                                        <form
                                            onSubmit={handleSubmit}
                                            ref={form}
                                        >
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="email"
                                                >
                                                    <b>Email</b>
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    className="form-control form-control-lg border border-4"
                                                />
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body"
                                                >
                                                    Reset Password
                                                </button>
                                            </div>

                                            <p className="text-center text-muted ">
                                                Remember your password?{" "}
                                                <Link
                                                    className="signin-link link-size"
                                                    to="/signin"
                                                >
                                                    Sign in here
                                                </Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ForgotPassword;
