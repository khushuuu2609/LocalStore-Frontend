import { useRef } from "react";
import category from "../../service/categories";
import { toast } from "react-toastify";
function Shop() {
    const form = useRef(null);
    const token = JSON.parse(localStorage.getItem("token"));
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData(form.current);
        formdata.append("userid", token.userId);
        const response = await fetch("http://localhost:8080/api/img/shop", {
            method: "POST",
            body: formdata,
            headers: { Authorization: `Bearer ${token.token}` },
        });
        const data = await response.text();
        toast.success(data);
        form.current.reset();
    };
    return (
        <div className="container home-layout card-bg w-50 vh-90">
            <h2>Product Details Form</h2>
            <form onSubmit={handleSubmit} ref={form}>
                <div className="mb-3">
                    <label htmlFor="photo" className="form-label">
                        Upload Photo
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="photo"
                        name="photo"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="categories" className="form-label">
                        Select Categories
                    </label>
                    <select
                        className="form-select"
                        id="categories"
                        name="category"
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
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Shop;
