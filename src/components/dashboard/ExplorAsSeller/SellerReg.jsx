import { useRef, useState } from "react";
import categories from "../../../service/categories";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

function SellerReg() {
    const form = useRef(null);
    const [error, setError] = useState(null);
    const { toggleUpdate } = useOutletContext();
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(form.current);
        const user = Object.fromEntries(formData.entries());
        const postResponse = await fetch(
            `https://api.postalpincode.in/pincode/${user.pin_code}`
        );
        const postData = await postResponse.json();
        if (postData[0]?.Status === "Error") {
            setError("Wrong Pincode!");
            return;
        }
        user.city = postData[0].PostOffice[0].District;
        // Extract selected categories and convert them to an array
        const selectedCategories = Array.from(formData.getAll("categories"));

        // Update the user object with the selected categories array
        user.categories = selectedCategories;
        console.log(selectedCategories);
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await fetch(
            `http://localhost:8080/api/auth/seller?userId=${token.userId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.token}`,
                },
                body: JSON.stringify(user),
            }
        );

        const data = await response.text();

        if (data?.error) {
            setError(data.error);
            return;
        }
        form.current.reset();

        const userToken = JSON.parse(localStorage.getItem("token"));
        const roleUpdateResponse = await fetch(
            `http://localhost:8080/api/auth/upgradeToSeller/${userToken.userId}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: "SELLER" }),
            }
        );

        const roleUpdateData = await roleUpdateResponse.text();
        userToken.role = "SELLER";
        localStorage.setItem("token", JSON.stringify(userToken));
        toast.success("Seller registration done");
        toggleUpdate((prev) => !prev);
        navigate("/");
        console.log("roleUpdateData", roleUpdateData);
    }

    return (
        <div className="container home-layout card-bg w-50 vh-95">
            <h2>Seller Registration</h2>
            <br></br>
            <span>{error}</span>
            <form onSubmit={handleSubmit} ref={form}>
                <div className="mb-3">
                    <label htmlFor="categories" className="form-label">
                        Categories
                    </label>
                    <select
                        className="form-select"
                        id="categories"
                        name="categories"
                        multiple
                    >
                        {categories.map((data, id) => (
                            <option key={id} value={data}>
                                {data}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control border border-4  form-control-lg"
                        id="description"
                        name="description"
                        rows="3"
                    ></textarea>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example1cgarea">
                        <b>Area</b>
                    </label>
                    <input
                        type="text"
                        required
                        id="form3Example1cgarea"
                        name="areaName"
                        className="form-control border border-4  form-control-lg"
                    />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example1cg2">
                        <b>Pin Code</b>
                    </label>
                    <input
                        type="number"
                        required
                        id="form3Example1cg2"
                        name="pin_code"
                        className="form-control border border-4  form-control-lg"
                    />
                </div>

                <br></br>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SellerReg;
