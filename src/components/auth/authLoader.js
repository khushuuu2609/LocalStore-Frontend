import { redirect } from "react-router-dom";

export function isLoggedin() {
    const token = localStorage.getItem('token');
    if (token) {
        return redirect("/home")
    }
    return null
}