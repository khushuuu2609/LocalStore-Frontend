import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from 'lottie-react'
import animationSvg from '../../assets/animation.json'
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
        })
        if (res.ok) {
            nav("/verify-otp", { state: email });
        }
        // Reset the form after submission
        form.current.reset();
    }

    return (
        <div className='form-container'>
            <div className='bg-white'>
                <div className="form">
                    <div className='animation-div'>
                        <Lottie className="animation" animationData={animationSvg} />
                    </div>

                    <div className='form-class'>
                        <div className='form-title'>
                            <h1>FORGOT PASSWORD</h1>
                        </div>

                        <form onSubmit={handleSubmit} ref={form} className="form-body">

                            <div className="username input-fields">
                                <label className="form__label" htmlFor="email">Email </label>
                                <input className="form__input" name="email" required type="text" id="email" placeholder="Email" />
                            </div>

                            <div className="footer-btn">
                                <button type="submit" className="submit-btn">Get OTP</button>
                            </div>
                        </form>
                        <div className="footer-btn mg">
                            <p className='mooli'>Remember your password? {" "} </p>

                            <Link className='sign-link' to="/">
                                <p className='sign-link '>Login here!</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ForgotPassword;
