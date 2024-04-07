import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from 'lottie-react'
import animationSvg from '../../assets/animation.json'
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
        <div className='form-container'>
            <div className='bg-white'>
                <div className="form">
                    <div className='animation-div'>
                        <Lottie className="animation" animationData={animationSvg} />
                    </div>

                    <div className='form-class'>
                        <div className='form-title'>
                            <h1>VERIFY OTP</h1>
                        </div>

                        <form onSubmit={handleSubmit} ref={form} className="form-body">

                            <div className="username input-fields">
                                <label className="form__label" htmlFor="OTP">OTP </label>
                                <input className="form__input" name="otp" required type="text" id="OTP" placeholder="OTP" />
                            </div>

                            <div className="footer-btn">
                                <button type="submit" className="submit-btn">Verifiy OTP</button>
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

export default VerifyOTP;
