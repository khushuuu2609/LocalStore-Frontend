import React from 'react';
import category from '../../../service/categories';

function SellerReg() {
    return (
        <div className="container home-layout card-bg w-50 vh-90">
        <h2>Seller Registration</h2>
        <br></br>
        <form>
            <div className="mb-3">
                <label htmlFor="categories" className="form-label">Category</label>
                <select className="form-select" id="categories" name="category">
                        {
                            category.map((data, id) => <option key={id} value={data}>{data}</option>)
                        }
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" rows="3"></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input type="text" className="form-control" id="location" name="location" />
            </div>
            <br></br>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    );
}

export default SellerReg;
