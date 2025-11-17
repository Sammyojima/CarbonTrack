import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0b1120]/95 backdrop-blur-md text-gray-200 flex justify-between items-center px-6 py-4 shadow-lg border-b border-blue-900/30 z-50">

      {/* LOGO */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="CarbonTrack Logo"
          className="w-10 h-10 rounded shadow-lg shadow-blue-500/20 hover:scale-105 transition"
        />
        <Link to="/" className="text-2xl font-bold tracking-wide text-blue-400 drop-shadow-lg">
          CarbonTrack
        </Link>
      </div>

      {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6 text-lg">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
          <Link to="/about" className="hover:text-blue-400 transition">About</Link>
          <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>

          {user ? (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
              <Link to="/register" className="hover:text-blue-400 transition">Register</Link>
            </>
          )}
        </div>


      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden text-3xl text-blue-400"
        onClick={() => setIsOpen(true)}
      >
        <FiMenu />
      </button>

      {/* MOBILE SLIDE-IN MENU */}
      <div
        className={`fixed top-0 right-0 h-fit py-6 w-48 bg-[#0b1120]/95 backdrop-blur-xl border-l border-blue-800/40 shadow-xl rounded-bl-3xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 pb-4 border-b border-blue-900/30">
          <h2 className="text-xl font-bold text-blue-400">Menu</h2>
          <FiX
            className="text-2xl cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* NAV LINKS */}
        <div className="flex flex-col gap-4 p-6 text-lg">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
                Login
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
                Register
              </Link>
            </>
          )}

          <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
            About
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
            Contact
          </Link>

          {/* LOGOUT BUTTON AT THE BOTTOM */}
          {user && (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="mt-4 px-3 py-2 text-sm bg-red-600 hover:bg-red-700 rounded-md text-white transition w-fit"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}
