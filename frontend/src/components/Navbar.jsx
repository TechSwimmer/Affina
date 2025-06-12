import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"      // Authentication context 
import { useNavigate } from "react-router-dom"            // React Router navigation
import Logo from "../assets/logo-img.jpg"                 // App logo

//Icons
import { IoIosAdd,IoMdMenu, IoMdClose, IoIosLogOut  } from "react-icons/io"
import { IoAddCircleOutline } from "react-icons/io5";

const Navbar = () => {
    // Get logout handler from AuthContext
    const {handleLogout} = useContext(AuthContext) 

    const navigate = useNavigate();                   // Router navigation
    const [menuOpen, setMenuOpen] = useState(false)   // Toggle mobile menu

    // Navigate to the "Create Post" page
    const handlepostClick = () => {
        navigate("/create-post")
    }

    // Handle logout and redirect to login page
    const handleLogoutClick = () => {
        handleLogout()
        navigate('/')
    }

    return (
        <div className="flex  w-full flex-col md:flex-row items-center justify-between p-3 bg-[#0c0620] text-white fixed">
            {/* Logo and hamburger menu for mobile */}
            <div className="w-full ,md:w-auto flex justify-between items-center">
                <img
                    src={Logo}
                    alt="Logo"
                    className="w-32 md:w-44 h-14 cursor-pointer"
                    onClick={() => navigate("/")}
                />
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl md:hidden">
                    {menuOpen ? <IoMdClose/> : <IoMdMenu/>}
                </button>
            </div>
            {/* Desktop navigation button */}
            <div className="hidden md:flex md:items-center md:space-x-4">
                <button onClick={handlepostClick} className="flex item-center space-x-2 py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 font-void text-white">
                    <span className="text-sm w-30">Add new post</span>
                    <IoAddCircleOutline className="text-xl"/>
                </button>
            </div>
            
             {/* Mobile menu (toggle visible) */}
            {menuOpen && (
                <div className="mt-4 md:hidden flex flex-col space-y-4 w-1/2 ">
                    <button onClick={handlepostClick} className="flex items-center hover:bg-gray-600 gap-1 py-2 px-2 rounded-lg font-bold text-white w-full justify-center">
                        <IoAddCircleOutline className="text-xl"/>Add new post
                    </button>
                    <button onClick={handleLogoutClick} className="flex items-center hover:bg-gray-600 gap-2 space-x-2 py-2 px-4 rounded-lg font-bold text-white w-full justify-center">
                        <IoIosLogOut className="text-xl"/>Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default Navbar