import React from 'react'

function Signup() {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:8080/api/v1/auth/signup', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: {
                "username": "Tisha",
                "email": "Tisha@gmail.com",
                "password": "Tisha",
                "confirmPassword": "Tisha",
                "location": "Pardi"
            }
        })
        console.log(response.json())
        console.log("submitted")
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
                                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                        <form onSubmit={handleSubmit}>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example1cg"><b>UserName</b></label>
                                                <input type="text" id="form3Example1cg" name="username" className="form-control form-control-lg border border-4 " />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example3cg"><b>Your Email</b></label>
                                                <input type="email" id="form3Example3cg" name="email" className="form-control form-control-lg border border-4 " />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example4cg"><b>Password</b></label>
                                                <input type="password" id="form3Example4cg"  name="password" className="form-control form-control-lg border border-4 " />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example4cdg"><b>Repeat Password</b></label>
                                                <input type="password" id="form3Example4cdg" name="confirmPassword" className="form-control form-control-lg border border-4 " />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example1cg2"><b>Location</b></label>
                                                <input type="text" id="form3Example1cg" name="location" className="form-control border border-4  form-control-lg" />
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="submit"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                                                className="fw-bold text-body"><u>Login here</u></a></p>

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

export default Signup
