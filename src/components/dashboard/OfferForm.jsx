import React, { useRef } from "react";
import categories from "../../service/categories";

const OfferForm = ({ offerId, formState }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const form = useRef(null);
    async function handleSubmit(e) {
        e.preventDefault();
        const offer = new FormData(form.current);
        offer.set("categories", offerId?.categories);
        offer.set("sellerId", token?.sellerId);
        offer.set("shopId", offerId?.shopId?.shopId);
        offer.set("userId", offerId.user.id);
        // http://localhost:8080/api/img/offer

        const response = await fetch("http://localhost:8080/api/img/offer", {
            method: "POST",
            body: offer,
            headers: { Authorization: `Bearer ${token.token}` },
        });
        const data = await response.json();
        console.log(data);
    }
    function hideForm(e) {
        if (e.target.id === "form-container") {
            formState(false);
            return;
        }
    }
    console.log(offerId);
    return (
        <div
            className="position-fixed top-0 start-0 vw-100 v-100 form-bacdrop"
            id="form-container"
            onClick={hideForm}
        >
            <div className="container home-layout bg-white p-5 rounded w-50 vh-90">
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
                        <label htmlFor="price" className="form-label">
                            Price
                        </label>
                        <input
                            className="form-control"
                            type="number"
                            required
                            id="price"
                            name="price"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OfferForm;
