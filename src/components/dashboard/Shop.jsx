import { useRef, useState } from "react";
import categories from "../../service/categories";
import { toast } from "react-toastify";
import { readImage } from "../../service/readImage";

function Shop() {
    const form = useRef(null);
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState(""); // State for productName
    const token = JSON.parse(localStorage.getItem("token"));

    const fileChange = async (e) => {
        const imageString = await readImage(e.target.files[0]);
        setImage(imageString);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData(form.current);
        formdata.append("userId", token.userId);
        formdata.append("username", token.username);

        const response = await fetch("http://localhost:8080/api/img/shop", {
            method: "POST",
            body: formdata,
            headers: { Authorization: `Bearer ${token.token}` },
        });
        const data = await response.text();
        toast.success(data);
        setImage(null);
        setProductName(""); // Clear productName after form submission
        form.current.reset();
    };

    return (
        <div className="w-screen flex items-start justify-center">
            <div className="bg-white my-12 rounded-md w-10/12 md:w-3/5 lg:w-1/2 xl:w-1/3 2xl:w-2/5">
                <div className="flex items-center justify-between bg-themeColor-400 text-white font-semibold rounded-t-md p-1">
                    <h1 className="text-lg">Place Order</h1>
                </div>
                <div className="w-full flex-1 p-14">
                    <form ref={form} onSubmit={handleSubmit}>
                        <div className="mx-auto max-w-sm flex flex-col gap-4">
                            <div className="flex items-center justify-center w-full">
                                {!image ? (
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="32"
                                                height="32"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-8 h-8 mb-4 text-gray-500"
                                            >
                                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                                                <line
                                                    x1="16"
                                                    x2="22"
                                                    y1="5"
                                                    y2="5"
                                                />
                                                <line
                                                    x1="19"
                                                    x2="19"
                                                    y1="2"
                                                    y2="8"
                                                />
                                                <circle cx="9" cy="9" r="2" />
                                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 ">
                                                <span className="font-semibold">
                                                    Click to upload
                                                </span>{" "}
                                                or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG, JPEG (MAX. 800x400px)
                                            </p>
                                        </div>
                                    </label>
                                ) : (
                                    <div className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="32"
                                                height="32"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#a30000"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="z-10"
                                                onClick={() => {
                                                    setImage(null);
                                                    form.current[0].value =
                                                        null;
                                                }}
                                            >
                                                <path d="M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                                                <line
                                                    x1="16"
                                                    x2="22"
                                                    y1="5"
                                                    y2="5"
                                                />
                                                <circle cx="9" cy="9" r="2" />
                                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                            </svg>
                                        </div>
                                        <img
                                            src={image}
                                            className="absolute w-full h-full rounded-xl object-contain object-center opacity-40"
                                            alt=""
                                        />
                                    </div>
                                )}
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    name="photo"
                                    onChange={fileChange}
                                    accept="image/*"
                                />
                            </div>
                            <div className="">
                                <label htmlFor="categories" className="block">
                                    Select Categories
                                </label>
                                <select
                                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    id="categories"
                                    name="categories"
                                    required
                                >
                                    {categories.map((data, id) => (
                                        <option key={id} value={data}>
                                            {data}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="productName" className="">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    id="productName"
                                    name="productName"
                                    value={productName}
                                    onChange={(e) =>
                                        setProductName(e.target.value)
                                    } // Handle input change
                                    required
                                />
                            </div>
                            <div className="">
                                <label htmlFor="description" className="">
                                    Description
                                </label>
                                <textarea
                                    className="w-full resize-none px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    id="description"
                                    name="description"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <button className="bg-green-500 py-2 px-8 text-white rounded-3xl hover:bg-green-700  active:bg-green-600 transition-all duration-500">
                                    Place
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Shop;
