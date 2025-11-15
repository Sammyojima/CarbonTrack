import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";
import heroImage from "../assets/hero.jpg";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  const cards = [
    {
      title: "Real-Time Monitoring",
      desc: "Observe CO₂ emissions live with detailed analytics for each unit.",
    },
    {
      title: "Automated Calculations",
      desc: "Upload data or input manually and let CarbonTrack handle the math.",
    },
    {
      title: "Insightful Reports",
      desc: "Generate visual trends and actionable insights to reduce your carbon footprint.",
    },
  ];

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-[#080d17] text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Dark/Light Mode Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div
          className={`absolute inset-0 ${
            darkMode
              ? "bg-gradient-to-b from-[#080d17]/30 to-[#080d17]/95"
              : "bg-gradient-to-b from-gray-100/30 to-gray-100/95"
          }`}
        ></div>

        <motion.div
          className="text-center px-6 z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1
            className={`text-5xl md:text-7xl font-extrabold drop-shadow-lg mb-4 ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            CarbonTrack
          </h1>
          <p
            className={`text-lg md:text-2xl mt-4 max-w-2xl mx-auto leading-relaxed ${
              darkMode ? "text-blue-100" : "text-gray-800"
            }`}
          >
            Track, visualize, and analyze CO₂ emissions from hydrogen generation, ammonia,
            and gas plants in real-time with advanced analytics.
          </p>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg transition-all hover:scale-[1.03]"
          >
            <FiLogIn className="text-2xl" /> Get Started
          </Link>
        </motion.div>
      </section>

      {/* Glassmorphism Cards Section */}
      <section className="py-20 px-6 md:px-20 flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            className={`${
              darkMode
                ? "bg-white/10 border border-blue-400/30 text-gray-300"
                : "bg-white/20 border border-gray-300/30 text-gray-900"
            } backdrop-blur-md rounded-3xl p-8 max-w-xs text-center shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all`}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.5 }}
          >
            <h3
              className={`text-2xl font-bold mb-4 ${
                darkMode ? "text-blue-300" : "text-blue-600"
              }`}
            >
              {card.title}
            </h3>
            <p className={darkMode ? "text-gray-300" : "text-gray-800"}>{card.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* About Section */}
      <section
        className={`py-20 px-6 text-center border-t ${
          darkMode ? "bg-[#0d1324] border-blue-900/30" : "bg-gray-100 border-gray-300"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 drop-shadow-md ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            About CarbonTrack
          </h2>
          <p
            className={`max-w-3xl mx-auto text-lg md:text-xl leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-800"
            }`}
          >
            CarbonTrack is a futuristic emissions intelligence dashboard for engineers
            and managers. Optimize your operations, reduce emissions, and make
            data-driven decisions with real-time analytics and visualizations.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
