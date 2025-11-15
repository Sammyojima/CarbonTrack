import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0f1a] text-gray-200 flex justify-between items-center px-6 py-4 shadow-lg border-b border-blue-900/30">
      
      {/* LOGO */}
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12">
          <img 
            src={logo} 
            alt="CarbonTrack Logo" 
            className="w-full h-full rounded-lg shadow-2xl transform -rotate-3 scale-105"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-400 to-cyan-400 opacity-30 blur-xl pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-t from-white/30 to-transparent pointer-events-none"></div>
        </div>

        <Link 
          to="/" 
          className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200 text-transparent bg-clip-text drop-shadow-[0_2px_6px_rgba(0,255,255,0.5)]"
        >
          CarbonTrack
        </Link>
      </div>

      {/* NAV LINKS */}
      <div className="flex items-center gap-6 text-lg">
        <Link to="/" className="hover:text-blue-400 transition">Home</Link>

        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
            <Link to="/register" className="hover:text-blue-400 transition">Register</Link>
          </>
        )}

        <Link to="/about" className="hover:text-blue-400 transition">About</Link>
        <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
      </div>
    </nav>
  );
}
