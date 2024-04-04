import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function VerifyOTP() {
    const form = useRef(null);
    const nav = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(form.current);
        const otp = formData.get("otp");
        try {
            const response = await fetch(
                `http://localhost:8080/api/auth/verify-otp?otp=${otp}`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            if (response.status === 200) {
                toast.success("OTP verified!!");
                nav("/resetpassword");
            } else toast.error("OTP does not match!!");
        } catch (e) {
            toast.error("OTP does not match!!");
        }
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
                                            Verify OTP
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
                                                    <b>OTP</b>
                                                </label>
                                                <input
                                                    type="otp"
                                                    id="otp"
                                                    name="otp"
                                                    required
                                                    className="form-control form-control-lg border border-4"
                                                />
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body"
                                                >
                                                    Verify OTP
                                                </button>
                                            </div>

                                            <p className="text-center text-muted ">
                                                Remember your password?{" "}
                                                <Link
                                                    className="signin-link"
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

export default VerifyOTP;
