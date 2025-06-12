import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TiltCard from "../components/TiltCard"
import image from '../assets/affina-landing-img.jpg'
import logo from '../assets/logo-img.jpg'
import microsoft from '../assets/microsoft-logo.svg'
import googleplay from '../assets/Google_Play-Logo.wine.svg'
import { AuthContext } from "../context/AuthContext";
import { FaFacebook, FaHandMiddleFinger } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

const RegisterPage = () => {

    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);
    const { handleRegister } = useContext(AuthContext)
    const [userFormData, setUserFormData] = useState({
        email: "",
        password: "",
        username: "",
    })

    // const handleAvatarChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setAvatar(file);
    //     }
    // };

    const handleChange = async (e) => {
        const { name, value, files } = e.target;
        if (name === "avatar") {
            setUserFormData((prev) => ({ ...prev, avatar: files[0] }));
        } else {
            setUserFormData((prev) => ({ ...prev, [name]: value }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", userFormData.username);
        formData.append("email", userFormData.email);
        formData.append("password", userFormData.password);
        if (userFormData.avatar) {
            formData.append("image", userFormData.avatar); // ⬅️ Must match Multer field name
        }
        await handleRegister(formData)
    }


    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-gh-screen text-white p-6">

            {/* Left TiltCard Section */}
            <div className="md:flex md:w-1/2 items-center justify-center">
                <TiltCard scaleFactor={1.25}>
                    <h1 className="ml-6">Unified Mentor Socialis</h1>
                    <img
                        src={image}
                        alt="Logo"
                        className="rounded-l w-auto h-auto shadow-xl ml-6"
                    />
                </TiltCard>
            </div>

            {/* Right Form Section */}
            <div className="flex-1 max-w-md mx-4 max-h-screen sm:mx-auto p-4 border border-gray-500 rounded-xl">
                <div className="rounded-lg p-6 shadow-lg">
                    <img src={logo} alt="logo" className="w-full h-12 " />
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={userFormData.email}
                            onChange={handleChange}
                            name="email"
                            placeholder="Phone numner, username or email"
                            className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            value={userFormData.password}
                            onChange={handleChange}
                            name="password"
                            placeholder="Password"
                            className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-blue-500"
                        />
                        <input
                            type="username"
                            value={userFormData.username}
                            onChange={handleChange}
                            name="username"
                            placeholder="Username"
                            className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-blue-500"

                        />

                        {/* Avatar Upload */}
                        <div className="relative w-full">
                            <label className="block text-sm text-gray-300 mb-1">Upload Avatar (optional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                name="avatar"
                                onChange={handleChange} // (You’ll handle file input in a moment)
                                className="w-full p-2 bg-white text-gray-900 rounded-lg text-sm file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                                style={{ height: "40px" }}
                            />
                        </div>

                        <button type="submit" className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold">
                            Register

                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <hr className="flex-1 border-gray-700 " />
                        <span className="px-2 text-blue-800">OR</span>
                        <hr className="flex-1 border-gray-700" />
                    </div>

                    {/* Social Logins (placeholder) */}
                    <div className="py-3 rounded-lg flex flex-row items-center justify-evenly space-x-2">
                        <FaFacebook className="text-2xl cursor-pointer" />
                        <FaGoogle className="text-2xl cursor-pointer" />
                        <FaApple className="text-2xl  cursor-pointer" />

                    </div>

                </div>

                {/* Already Registered Link */}
                <div className="mt-4 bg-[#251469e8] text-gray-400 rounded-lg p-4 text-center">
                    Already have an account?{""}
                    <span onClick={() => navigate("/login")} className="text-blue-600 hover:underline cursor-pointer">
                        Login
                    </span>
                </div>

                {/* Download App */}
                <div className="mt-4 text-center">
                    <p>Get the app.</p>
                    <div className="flex justify-center spacec-x-4 mt-4">
                        <img
                            src={googleplay}
                            alt="Google play"
                            className="w-24 md:w-26 h-12 cursor-pointer"
                        />
                        <img
                            src={microsoft}
                            alt="Microsoft store"
                            className="w-24 md:w-26 h-11 cursor-pointer"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};


export default RegisterPage;