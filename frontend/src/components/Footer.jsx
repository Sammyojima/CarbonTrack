import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="bg-[#080d17] text-gray-300 border-t border-gray-700 mt-12 pt-10 pb-6"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-lg font-semibold mb-2">CarbonTrack</h2>
          <p className="text-sm text-gray-400">
            Monitoring CO₂ emissions for a cleaner and smarter energy future.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <div className="flex flex-col space-y-2">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/dashboard">Dashboard</FooterLink>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-400">carbontrack.support@gmail.com</p>
          <p className="text-sm text-gray-400">+234 810 751 3032</p>
          <p className="text-sm text-gray-400">Lagos, Nigeria</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} CarbonTrack. All rights reserved.
      </div>
    </motion.footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link className="hover:text-green-400 transition" to={to}>
      {children}
    </Link>
  );
}
