import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from 'lottie-react'
import { Link } from "react-router-dom";
import animationSvg from '../../assets/animation.json'
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
            if (data.role === "SELLER") {
                const seller = await await fetch(
                    `http://localhost:8080/api/auth/seller/${data.userId}`,
                    {
                        method: "GET",
                    }
                );
                const sellerData = await seller.json();
                data.sellerId = sellerData.sellerId;
            }
            localStorage.setItem(
                "token",
                JSON.stringify({
                    token: data.token,
                    userId: data.userId,
                    role: data.role,
                    username: data.username,
                    sellerId: data?.sellerId,
                })
            );
            navigate("/home");
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
                            <h1>LOGIN</h1>
                        </div>
                        <span className="text-red-600 font-semibold">
                                {error}
                            </span>
                        <form onSubmit={handleSubmit} ref={form} className="form-body">

                            <div className="username input-fields">
                                <label className="form__label" htmlFor="email">Email</label>
                                <input className="form__input" name='email' required type="text" id="email"  placeholder="User Email" />
                            </div>

                            <div className="password input-fields">
                                <label className="form__label" htmlFor="password">Password </label>
                                <input className="form__input" name='password' required type="password"  id="password" placeholder="Password" />
                            </div>

                            <div className="footer-btn mg">
                                <Link className='sign-link' to="/forgotpassword"><p className='sign-link'>Forgot Password?</p></Link>
                            </div>

                            <div className="footer-btn">
                                <button type="submit" className="submit-btn">Login</button>
                            </div>

                            <p className='footer-btn mg'>––––––OR––––––</p>

                            <div className="footer-btn mg">
                                <p className='mooli'>Don't have an account?</p>
                                <Link className='sign-link' to="/signup"><p className='sign-link'>Signup here!</p></Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Signin;
