import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

export default function About() {
  const [darkMode, setDarkMode] = useState(true);

  const sections = [
    {
      title: "Purpose",
      content: `CarbonTrack is a web-based engineering dashboard that enables real-time monitoring, analysis, 
      and optimization of carbon emissions from hydrogen generation units, ammonia plants, power plants, and other process plants. 
      It provides both operational oversight and actionable insights to reduce CO, CO₂, and total carbon emissions while maintaining 
      efficient combustion performance.`,
    },
    {
      title: "Data Input",
      content: [
        "Manual entry of key process parameters:",
        [
          "Fuel type (natural gas, propane, purge gas, coal)",
          "Combustion air flow rate",
          "Furnace or reformer temperature",
          "Pressure of the system",
          "Fuel flow rates",
        ],
        "Print out results for batch data analysis and historical process logs",
        "Option to integrate with plant sensors for automated real-time data streaming (future module)",
      ],
    },
    {
      title: "Emission Calculations",
      content: [
        "CarbonTrack uses stoichiometric and empirical combustion models to calculate:",
        ["CO emissions", "CO₂ emissions", "Total carbon released into the atmosphere"],
        "It takes into account fuel composition, excess air, and operating conditions, providing instantaneous emission values as well as cumulative emissions over time.",
      ],
    },
    {
      title: "Visualization and Analytics",
      content: [
        "Interactive dashboards with trend charts, heatmaps, and time-series plots",
        "Historical comparison of emissions to evaluate operational changes",
        "Alerts and thresholds for abnormal emissions or deviations from optimal combustion conditions",
      ],
    },
    {
      title: "Recommendations Engine",
      content: [
        "Suggests adjustments to air flow, temperature, or fuel ratios to minimize carbon output",
        "Provides operational guidance for achieving cleaner combustion without compromising hydrogen production efficiency",
        "Enables data-driven decisions for sustainability compliance and cost optimization",
      ],
    },
    {
      title: "Technical Stack",
      content: [
        "Web-based interface: React.js front-end",
        "Backend calculations: Node.js/Express with integrated combustion algorithms",
        "Data storage and processing: PostgreSQL or MongoDB",
        "Visualization libraries: Chart.js or Recharts",
      ],
    },
    {
      title: "Benefits",
      content: [
        "Real-time monitoring of emissions for regulatory compliance",
        "Historical data analysis for process optimization",
        "Actionable recommendations to reduce carbon footprint",
        "Supports sustainable hydrogen production and other process plant initiatives",
      ],
    },
  ];

  return (
    <div
      className={`relative min-h-screen p-6 md:p-12 ${
        darkMode ? "bg-[#080d17] text-gray-200" : "bg-gray-50 text-gray-900"
      } transition-colors duration-500`}
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
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1
          className={`text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-4 ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          CarbonTrack – Technical Overview
        </h1>
        <p
          className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-800"
          }`}
        >
          Explore how CarbonTrack helps engineers and managers monitor, analyze, and optimize carbon emissions in real-time.
        </p>
      </motion.div>

      {/* Glassmorphism Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            className={`${
              darkMode
                ? "bg-white/10 border border-blue-400/30 text-gray-300"
                : "bg-white/20 border border-gray-300/30 text-gray-900"
            } backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <h2
              className={`text-2xl font-bold mb-4 ${
                darkMode ? "text-blue-300" : "text-blue-600"
              }`}
            >
              {section.title}
            </h2>

            {Array.isArray(section.content) ? (
              <ul className={`list-disc list-inside space-y-2`}>
                {section.content.map((item, index) =>
                  Array.isArray(item) ? (
                    <ul key={index} className="list-disc list-inside ml-5 space-y-1">
                      {item.map((sub, subIndex) => (
                        <li key={subIndex}>{sub}</li>
                      ))}
                    </ul>
                  ) : (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            ) : (
              <p className="leading-relaxed">{section.content}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
