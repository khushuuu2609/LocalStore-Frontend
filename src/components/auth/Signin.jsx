import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Signin() {
    const form = useRef(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(form.current);
        const user = Object.fromEntries(formData.entries());

        const response = await fetch("http://localhost:8080/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        if (data?.error) {
            setError(data.error);
            return;
        } else {
            toast.success("Login successful!");
            navigate("/home");
        }
        console.log(data);
        localStorage.setItem(
            "token",
            JSON.stringify({
                token: data.token,
                userId: data.userId,
                role: data.role,
            })
        );
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
                                            Login
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

                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                                >
                                                    Login
                                                </button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">
                                                {"Don't have an account?"}
                                                <Link
                                                    className="sign-link"
                                                    to="/signup"
                                                >
                                                    {" "}
                                                    Signup Here!!{" "}
                                                </Link>
                                            </p>

                                            <p className="text-center text-muted">
                                                Forgot password?{" "}
                                                <Link
                                                    className="signin-link"
                                                    to="/forgotpassword"
                                                >
                                                    Change Here!!
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

export default Signin;
