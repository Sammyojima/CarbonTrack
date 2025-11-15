// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiPlusCircle, FiBarChart2 } from "react-icons/fi";

const items = [
  { to: "/", label: "Home", icon: <FiHome /> },
  { to: "/dashboard", label: "Dashboard", icon: <FiBarChart2 /> },
  { to: "/add", label: "Add Data", icon: <FiPlusCircle /> },
];

export default function Sidebar({ collapsed }) {
  const loc = useLocation();
  return (
    <aside className={`bg-[#021827] text-gray-200 p-4 transition-all ${collapsed ? "w-16" : "w-56"} hidden md:block`}>
      <div className="mb-6">
        <div className="text-sm font-semibold text-slate-300">CarbonTrack</div>
        {!collapsed && <div className="text-xs text-slate-500">Combustion Monitor</div>}
      </div>

      <nav className="space-y-2">
        {items.map((it) => {
          const active = loc.pathname === it.to;
          return (
            <Link key={it.to} to={it.to}
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-slate-800 transition ${active ? "bg-slate-800" : ""}`}>
              <div className="text-lg">{it.icon}</div>
              {!collapsed && <div className="text-sm">{it.label}</div>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
