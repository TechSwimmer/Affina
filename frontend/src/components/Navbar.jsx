import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import Logo from "../assets/logo-img.jpg"
import { IoIosAdd,IoMdMenu, IoMdClose, IoIosLogOut  } from "react-icons/io"
import { IoAddCircleOutline } from "react-icons/io5";

const Navbar = () => {
    
    const {handleLogout} = useContext(AuthContext) 
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false)

    const handlepostClick = () => {
        navigate("/create-post")
    }

    const handleLogoutClick = () => {
        handleLogout()
        navigate('/')
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-3 bg-[#0c0620] text-white ">
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
            <div className="hidden md:flex md:items-center md:space-x-4">
                <button onClick={handlepostClick} className="flex item-center space-x-2 py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 font-void text-white">
                    <span className="text-sm">Add new post</span>
                    <IoAddCircleOutline className="text-xl"/>
                </button>
            </div>

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