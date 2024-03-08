import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Signin() {
    const [UserData, setUserData] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            navigate('/Home')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //form submit event handlling function
    const handleSubmit = async event => {
        event.preventDefault();

        setLoading(true)
        //fetching API
        const response = await fetch("http://localhost:8080/api/v1/auth/signin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UserData)
        });

        const apiObj = await response.json()


        //if API responses error
        if (apiObj.error) {
            setLoading(false)
            alert(apiObj.error);
        }
        //if API responses successfully
        else if (apiObj.username) {

            localStorage.setItem("user", JSON.stringify(apiObj))

            setLoading(false)
            alert("Login Successfull !!")
            navigate("/Home");

        }
        //if API resonses 500 request
        else {
            setLoading(false)
            alert(apiObj.error.message)
        }
        setLoading(false)
    }

    //input change event handling function
    const onChange = (event) => {
        setUserData({ ...UserData, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <section className="vh-100 gradient-custom-3">
                <div className="mask d-flex align-items-center h-100 form-scale">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: '15px' }}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5">Login Here!!</h2>

                                        <form onSubmit={handleSubmit}>
                        
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example3cg"><b>Your Email</b></label>
                                                <input type="email" id="form3Example3cg" name="email" className="form-control border border-4 form-control-lg" />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example4cg"><b>Password</b></label>
                                                <input type="password" id="form3Example4cg"  name="password" className="form-control border border-4  form-control-lg" />
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="submit"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">dont's have an account? <a href="#!"
                                                className="fw-bold text-body"><u>Signup here</u></a></p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signin
