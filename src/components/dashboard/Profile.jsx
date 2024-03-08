import React from 'react';
import { FaCamera } from 'react-icons/fa';

function Profile (){
    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="Profile"/>
                        <span className="font-weight-bold">Shiva</span>
                        <span className="text-black-50">shiva@gmail.com</span>
                        <div className="mt-3">
                        <label htmlFor="profile-photo" className="text-primary">
                            <FaCamera className="mr-2" />
                            Change Profile Photo
                        </label>
                        <input type="file" id="profile-photo" className="d-none" />
                    </div>
                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="text-right ">Profile Settings</h3>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <label className="labels text-dark font-weight-bold">First Name</label>
                                    <input type="text" className="form-control profile-input" placeholder="first name" value="" />
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <label className="labels text-dark font-weight-bold">Last Name</label>
                                    <input type="text" className="form-control profile-input" value="" placeholder="lastname" />
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <label className="labels text-dark font-weight-bold">Email</label>
                                    <input type="email" className="form-control profile-input" value="" placeholder="email" />
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <label className="labels text-dark font-weight-bold">Password</label>
                                    <input type="password" className="form-control profile-input" value="" placeholder="password" />
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <label className="labels text-dark font-weight-bold">Location</label>
                                    <input type="text" className="form-control profile-input" value="" placeholder="location" />
                                </div>
                            </div>
                        </div>
                        {/* Rest of the form fields */}
                        <div className="mt-5 text-center">
                            <button className="btn btn-primary profile-button" type="button">Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;