import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function EnterNewPassword() {
    const { token } = useParams(); // Assuming the token is passed as a URL parameter
    const form = useRef(null);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(form.current);
        const newPassword = formData.get('newPassword');
        const confirmPassword = formData.get('confirmPassword');
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        // Add logic to handle the password update process
        console.log('New Password:', newPassword);
        // Reset the form after submission
        form.current.reset();
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
                                        <h2 className="text-uppercase text-center mb-4">Enter New Password</h2>

                                        <form onSubmit={handleSubmit} ref={form}>
                                            <span className='text-danger mb-3 d-block fw-bold'>{error}</span>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="newPassword"><b>New Password</b></label>
                                                <input type="password" id="newPassword" name="newPassword" required className="form-control form-control-lg border border-4" />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="confirmPassword"><b>Confirm Password</b></label>
                                                <input type="password" id="confirmPassword" name="confirmPassword" required className="form-control form-control-lg border border-4" />
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="submit" className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body">Reset Password</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0 ">Remember your password? <Link className='signin-link' to="/signin">Sign in here</Link></p>

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

export default EnterNewPassword;
