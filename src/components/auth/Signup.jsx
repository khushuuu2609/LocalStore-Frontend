import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {
    const form = useRef(null)
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(form.current)
        const user = Object.fromEntries(formData.entries())
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        const data = await response.json()
        if (data?.error) {
            setError(data.error)
            return
        }
        localStorage.setItem("token", JSON.stringify({token:data.token}))
    }
    return (
        <div>
            <section className="vh-100 gradient-custom-3">
                <div className="mask d-flex align-items-center h-100 form-scale">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: '15px' }}>
                                    <div className="card-body px-5">
                                        <h2 className="text-uppercase text-center mb-4">Create an account</h2>

                                        <form onSubmit={handleSubmit} ref={form}>
                                            <span className='text-danger mb-3 d-block  fw-bold'>{error}</span>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example1cg"><b>UserName</b></label>
                                                <input type="text" id="form3Example1cg" name="username" required className="form-control form-control-lg border border-4 " />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example3cg"><b>Your Email</b></label>
                                                <input type="email" required id="form3Example3cg" name="email" className="form-control form-control-lg border border-4 " />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example4cg"><b>Password</b></label>
                                                <input type="password" required id="form3Example4cg" name="password" className="form-control form-control-lg border border-4 " />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example4cdg"><b>Repeat Password</b></label>
                                                <input type="password" id="form3Example4cdg" name="confirmPassword"
                                                    required className="form-control form-control-lg border border-4 " />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example1cg2"><b>Location</b></label>
                                                <input type="text" required id="form3Example1cg2" name="location" className="form-control border border-4  form-control-lg" />
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="submit"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">Have an account?
                                             <Link className='signin-link' to="/signin">  Signin Here!!</Link></p>

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
