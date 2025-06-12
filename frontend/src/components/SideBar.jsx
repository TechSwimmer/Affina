import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";           // Navigation hook
import { AuthContext } from "../context/AuthContext";     // Auth context
import { RiHome2Line } from "react-icons/ri";
import { CgProfile } from 'react-icons/cg'
import { CiSettings } from 'react-icons/ci'
import { MdOutlineHelpOutline } from "react-icons/md";


const SideBar = () => {

    const navigate = useNavigate()      // For routing/navigation

    const { user, handleLogout } = useContext(AuthContext);  // Get user info and logout method

    // Logout handler
    const handleLogoutClick = () => {
        handleLogout();      // Clear auth state
        navigate('/');       // Redirect to home/login
    } 



    return (
        <div className="flex  bg-gradient-to-1 from-[#13072e] to-[#3f2182] text-white max-h-[87vh] h-[90vh] bg-custom-gradient flex-col border-r border-gray-600 rounded gap-4 items-center justify-between -mt-2 w-44 p-4">
            {/* Top section: Navigation icons and labels */}
            <div className="flex flex-col gap-3 mt-3">
                <div className="flex flex-row items-center gap-3 text-lg">
                    <RiHome2Line />
                    <p className="text-white">Home</p>
                </div>

                <div className="flex flex-row items-center gap-3 text-lg">
                    <CgProfile />
                    <p className="text-white">Profile</p>
                </div>

                <div className="flex flex-row items-center gap-3 text-lg">
                    <CiSettings />
                    <p className="text-white">Settings</p>
                </div>



            </div>
            {/* Bottom section: Help and Logout */}
            <div>
                <div className="flex flex-row items-center gap-3 text-md">
                    <MdOutlineHelpOutline />
                    <p className="text-white">Help and Support</p>
                </div>
                {/* Logout area with user avatar */}
                <div onClick={handleLogout} className="flex cursor-pointer flex-row items-center gap-3 mt-2 bg-red-700 rounded-lg px-2 py-2 text-white">
                    <img src={user.avatar} className="rounded-full w-10 h-8"/>
                    <p className="text-md ">Logout</p>
                </div>
            </div>

        </div>
    )
}

export default SideBar
