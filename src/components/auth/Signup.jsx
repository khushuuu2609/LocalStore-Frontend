import { useRef, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Lottie from 'lottie-react'
import animationSvg from '../../assets/animation.json'
import {toast} from 'react-toastify'
import '../auth.css'
function Signup() {
    const form = useRef(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
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
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        if (data?.error) {
            setError(data.error);
            return;
        }
        toast.success("Registartion successfull!")
        navigate('/')
        form.current.reset();
    }

    return (
        <>
            <div className='form-container'>
                <div className='bg-white'>
                    <div className="form">
                        <div className='animation-div'>
                            <Lottie className="animation" animationData={animationSvg} />
                        </div>

                        <div className='form-class'>
                            <div className='form-title'>
                                <h1 className="mt-6">REGISTRATION</h1>
                            </div>
                            <span className="text-red-600 font-semibold">
                                {error}
                            </span>

                            <form onSubmit={handleSubmit} ref={form} className="form-body">

                                <div className="username input-fields">
                                    <label className="form__label" htmlFor="userName">User Name </label>
                                    <input className="form__input" name="username" required type="text" id="userName" placeholder="User Name" />
                                </div>

                                <div className="email input-fields">
                                    <label className="form__label" htmlFor="email">Email </label>
                                    <input type="email" id="email" name='email' required className="form__input" placeholder="Email" />
                                </div>

                                <div className="password input-fields">
                                    <label className="form__label" htmlFor="password">Password </label>
                                    <input className="form__input" name='password' required type="password" id="password" placeholder="Password" />
                                </div>

                                <div className="confirm-password input-fields">
                                    <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                                    <input className="form__input" name="confirmPassword" required type="password" id="confirmPassword" placeholder="Confirm Password" />
                                </div>

                                <div className="firstname input-fields">
                                    <label className="form__label" htmlFor="address">Address </label>
                                    <input className="form__input" name="address" required type="text" id="address" placeholder="Address" />
                                </div>

                                <div className="lastname input-fields">
                                    <label className="form__label" htmlFor="areaName">Area Name </label>
                                    <input type="text" id="areaName" name="areaName" required className="form__input" placeholder="Area Name" />
                                </div>

                                <div className="lastname input-fields">
                                    <label className="form__label" htmlFor="pin_code">Pin Code </label>
                                    <input type="text" id="pin_code" name="pin_code" required className="form__input" placeholder="Pin Code" />
                                </div>



                                <div className="footer-btn">
                                    <button type="submit" className="submit-btn">Signup</button>
                                </div>

                                <p className='footer-btn mg'>––––––OR––––––</p>

                                <div className="footer-btn">
                                    <p className='mooli'>Already have an account?</p>

                                    <Link className='sign-link' to="/">
                                        <p className='sign-link '>Login here!</p>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;


