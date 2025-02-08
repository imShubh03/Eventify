import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { FiMenu, FiX } from "react-icons/fi"; 

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-lg font-bold">Eventify</Link>
            
            {/* Hamburger Menu for Mobile */}
            <button className="md:hidden text-xl" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Desktop & Mobile Menu */}
            <div className={`md:flex ${isOpen ? "block" : "hidden"} md:block`}>
                <NavLinks user={user} logout={logout} />
            </div>
        </nav>
    );
};

const NavLinks = ({ user, logout }) => (
    <div className="flex flex-col md:flex-row md:items-center">
        {user ? (
            <>
                <Link to="/create-event" className="mx-2 p-2 hover:bg-gray-700 rounded">Create Event</Link>
                <Link to="/profile" className="mx-2 p-2 hover:bg-gray-700 rounded">Profile</Link>
                <button onClick={logout} className="bg-red-500 px-3 py-1 rounded mx-2">Logout</button>
            </>
        ) : (
            <>
                <Link to="/login" className="mx-2 p-2 hover:bg-gray-700 rounded">Login</Link>
                <Link to="/register" className="mx-2 p-2 hover:bg-gray-700 rounded">Register</Link>
            </>
        )}
    </div>
);

export default Navbar;
