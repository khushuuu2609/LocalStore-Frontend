import React from 'react'
import { Navigate, Outlet, json } from 'react-router-dom'

function RequiredAuth() {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
        return <>
            <Navigate to="/" replace />
        </>
    }
    else {
        return <>
            <Outlet />
        </>
    }
}

export default RequiredAuth
