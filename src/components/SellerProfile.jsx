import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import categories from "../service/categories";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function SellerProfile() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [category, setcategory] = useState([]);
    const form = useRef(null);
    const [error, setError] = useState(null);
    const [refersh, setRefresh] = useState(false);
    const userToken = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        const fetchUser = async () => {
            let response = await fetch(
                `http://localhost:8080/api/auth/seller/${userToken.userId}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            setUser(data);
            setcategory(data.categories);
            console.log(data);
        };
        fetchUser();
    }, [refersh]);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setcategory(typeof value === "string" ? value.split(",") : value);
    };
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(form.current);
        const User = Object.fromEntries(formData.entries());

        User.categories = category;
        console.log(user, User);
        const response = await fetch(
            `http://localhost:8080/api/auth/seller/${userToken.userId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...user, ...User }),
            }
        );
        const data = await response.text();
        setUser({ ...user, ...User });
        setRefresh((prev) => !prev);
        if (data?.error) {
            setError(data.error);
            return;
        }
        toast.success("Profile updated  successfully!");
        form.current.reset();
    }

    return (
        <div className="w-screen flex items-center justify-center">
            <div className="bg-white my-12 rounded-md w-10/12 md:w-3/5 lg:w-1/2 xl:w-1/3 2xl:w-2/5">
                <div className="flex items-center justify-between bg-themeColor-400 text-white font-semibold rounded-t-md p-1">
                    <h1 className="text-lg">Edit Profile</h1>
                </div>
                <span className="text-danger mb-3 d-block  fw-bold">
                    {error}
                </span>
                <div className="w-full flex-1 p-14">
                    <form onSubmit={handleSubmit} ref={form}>
                        <div className="row mt-2">
                            <div className=" mb-3">
                                <label className="labels text-dark font-weight-bold">
                                    UserName
                                </label>
                                <input
                                    type="text"
                                    className="w-full resize-none px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 
                                    text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    name="username"
                                    placeholder="first name"
                                    defaultValue={user?.user?.username}
                                />
                            </div>
                            <div className=" mb-3">
                                <label className="labels text-dark font-weight-bold">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full resize-none px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 
                                    text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    name="email"
                                    defaultValue={user?.user?.email}
                                    placeholder="email"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="categories" className="block">
                                    Select Categories
                                </label>
                                <FormControl sx={{ width: "100%" }}>
                                    <Select
                                        id="categories"
                                        labelId="categories"
                                        required
                                        multiple
                                        sx={{
                                            "& legend": { display: "none" },
                                            "& fieldset": { top: 0 },
                                            bgcolor: "rgb(243 244 246)",
                                            borderRadius: "0.5rem",
                                            width: "100%",
                                            border: "1px solid rgb(229 231 235)",
                                            outline: "none",
                                        }}
                                        value={category}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Chip" />}
                                        MenuProps={MenuProps}
                                        renderValue={(selected) => (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: 0.5,
                                                }}
                                            >
                                                {selected.map((value) => (
                                                    <Chip
                                                        key={value}
                                                        label={value}
                                                    />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {categories.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className=" mb-3">
                                <label
                                    htmlFor="description"
                                    className="labels text-dark font-weight-bold"
                                >
                                    Description
                                </label>
                                <textarea
                                    type="text"
                                    className="w-full resize-none px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 
                                            text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    id="description"
                                    name="description"
                                    rows="3"
                                    defaultValue={user?.description}
                                    placeholder="Description"
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="area"
                                    className="labels text-dark font-weight-bold"
                                >
                                    Area
                                </label>
                                <input
                                    type="text"
                                    className="w-full resize-none px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 
                                    text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    id="areaName"
                                    name="areaName"
                                    defaultValue={user.areaName}
                                />
                            </div>
                            <div className=" mb-3">
                                <label className="labels text-dark font-weight-bold">
                                    Pincode
                                </label>
                                <input
                                    type="number"
                                    className="w-full resize-none px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 
                                    text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    name="pin_code"
                                    defaultValue={user.pin_code}
                                    placeholder="Pincode"
                                />
                            </div>
                            <div className="mt-4">
                                <button
                                    className="bg-green-500 py-2 px-8 text-white rounded-3xl hover:bg-green-700  active:bg-green-600 transition-all duration-500"
                                    type="submit"
                                >
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* Rest of the form fields */}
            </div>
        </div>
    );
}

export default SellerProfile;
