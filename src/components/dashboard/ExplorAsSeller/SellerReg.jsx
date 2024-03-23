import { useRef, useState } from "react";
import category from "../../../service/categories";

function SellerReg() {
    const form = useRef(null);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(form.current);
        const user = Object.fromEntries(formData.entries());

        // Extract selected categories and convert them to an array
        const selectedCategories = Array.from(formData.getAll("category"));

        // Update the user object with the selected categories array
        user.category = selectedCategories;

        const response = await fetch("http://localhost:8080/api/auth/seller", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

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
        console.log("roleUpdateData", roleUpdateData);
    }

    return (
        <div className="container home-layout card-bg w-50 vh-95">
            <h2>Seller Registration</h2>
            <br></br>
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
                        {category.map((data, id) => (
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
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="area_name" className="form-label">
                        Area
                    </label>
                    <input
                        className="form-control"
                        id="area_name"
                        name="area_name"
                        rows="3"
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                        City
                    </label>
                    <input
                        className="form-control"
                        id="city"
                        name="city"
                        rows="3"
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="pin_code" className="form-label">
                        Pin-Code
                    </label>
                    <input
                        className="form-control"
                        id="pin_code"
                        name="pin_code"
                        rows="3"
                    ></input>
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
