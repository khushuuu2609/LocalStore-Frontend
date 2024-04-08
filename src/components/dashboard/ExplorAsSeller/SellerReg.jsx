import { useRef, useState } from "react";
import categories from "../../../service/categories";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
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
function SellerReg() {
    const form = useRef(null);
    const [error, setError] = useState(null);
    const { toggleUpdate } = useOutletContext();
    const [category, setcategory] = useState([]);
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

        // Update the user object with the selected categories array
        user.categories = category;
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
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setcategory(typeof value === "string" ? value.split(",") : value);
    };

    return (
        <div className="w-screen flex items-start justify-center">
            <div className="bg-white my-12 rounded-md w-10/12 md:w-3/5 lg:w-1/2 xl:w-1/3 2xl:w-2/5">
                <div className="flex items-center justify-between bg-themeColor-400 text-white font-semibold rounded-t-md p-1">
                    <h1 className="text-lg">Seller Registration</h1>
                </div>
                <div className="w-full flex-1 p-14">
                    <span>{error}</span>
                    <form onSubmit={handleSubmit} ref={form}>
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
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <textarea
                                className="w-full resize-none px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 
                        text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                id="description"
                                name="description"
                                rows="3"
                            ></textarea>
                        </div>
                        <div className="form-outline mb-4">
                            <label
                                className="form-label"
                                htmlFor="form3Example1cgarea"
                            >
                                Area
                            </label>
                            <input
                                type="text"
                                required
                                id="form3Example1cgarea"
                                name="areaName"
                                className="w-full resize-none px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 
                        text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label
                                className="form-label"
                                htmlFor="form3Example1cg2"
                            >
                                Pin Code
                            </label>
                            <input
                                type="number"
                                required
                                id="form3Example1cg2"
                                name="pin_code"
                                className="w-full resize-none px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 
                                    text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            />
                        </div>

                        <br></br>
                        <button
                            type="submit"
                            className="bg-green-500 py-2 px-8 text-white rounded-3xl"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SellerReg;
