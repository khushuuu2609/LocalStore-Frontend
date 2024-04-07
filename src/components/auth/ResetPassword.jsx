import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from 'lottie-react'
import animationSvg from '../../assets/animation.json'
function EnterNewPassword() {
    const { token } = useParams(); // Assuming the token is passed as a URL parameter
    const form = useRef(null);
    const [error, setError] = useState(null);
    const nav = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(form.current);
        const newPassword = formData.get("newPassword");
        const confirmPassword = formData.get("confirmPassword");
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const res = await fetch(
                `http://localhost:8080/api/auth/reset-password?password=${newPassword}`,
                { method: "POST", credentials: "include" }
            );
            const data = await res.text();
            if (res.status === 200) {
                toast.success(data);
                nav("/");
            } else toast.error("Something went wrong!!");
        } catch (error) {
            toast.error("Something went wrong!!");
        }
        // Add logic to handle the password update process
        console.log("New Password:", newPassword);
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
                            <h1>RESET PASSWORD</h1>
                        </div>

                        <form onSubmit={handleSubmit} ref={form} className="form-body">

                            <div className="password input-fields">
                                <label className="form__label" htmlFor="password">Password </label>
                                <input className="form__input" name='newPassword' required type="password" id="password" placeholder="Password" />
                            </div>

                            <div className="confirm-password input-fields">
                                <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                                <input className="form__input" name="confirmPassword" required type="password" id="confirmPassword" placeholder="Confirm Password" />
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

export default EnterNewPassword;
