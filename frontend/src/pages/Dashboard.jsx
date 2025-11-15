import { useEffect, useMemo, useState } from "react";
import "../chartSetup"; // register chart.js
import { Bar, Line } from "react-chartjs-2";
import { calculateEmissions } from "../utils/emissionCalculator";
import Sidebar from "../components/Sidebar";

const FUEL_OPTIONS = ["Natural Gas", "Propane", "Purge Gas", "Coal"];
const STORAGE_KEY = "ct_history_v1";

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [inputs, setInputs] = useState({
    fuelType: "Natural Gas",
    temperature: 820,
    pressure: 1.0,
    airFlow: 200,
    fuelFlow: 100,
  });
  const [session, setSession] = useState(null);
  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  function onChange(e) {
    const { name, value } = e.target;
    setInputs(s => ({ ...s, [name]: value }));
  }

  function analyzeAndSave() {
    const numeric = {
      fuelType: inputs.fuelType,
      temperature: Number(inputs.temperature),
      pressure: Number(inputs.pressure),
      airFlow: Number(inputs.airFlow),
      fuelFlow: Number(inputs.fuelFlow),
    };

    if (!numeric.temperature || !numeric.airFlow || !numeric.fuelFlow) {
      alert("Enter valid Temperature, Air Flow and Fuel Flow.");
      return;
    }

    const results = calculateEmissions(numeric);
    const s = {
      id: Date.now(),
      ts: new Date().toLocaleString(),
      inputs: numeric,
      results,
    };

    const newHist = [s, ...history].slice(0, 200);
    setSession(s);
    setHistory(newHist);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHist));
  }

  function clearHistory() {
    if (!confirm("Clear saved history? This cannot be undone.")) return;
    setHistory([]);
    setSession(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  const barData = useMemo(() => {
    if (!session) return null;
    return {
      labels: ["CO₂", "CO", "Carbon"],
      datasets: [{
        label: "Emissions",
        data: [session.results.CO2, session.results.CO, session.results.carbon],
        backgroundColor: ["#00C49A", "#F59E0B", "#EF4444"],
      }]
    };
  }, [session]);

  const lineData = useMemo(() => {
    const labels = history.map(h => h.ts).reverse();
    const co2 = history.map(h => h.results.CO2).reverse();
    const co = history.map(h => h.results.CO).reverse();
    return {
      labels: labels.length ? labels : ["No data"],
      datasets: [
        { label: "CO₂", data: co2.length ? co2 : [0], borderColor: "#00C49A", backgroundColor: "rgba(0,196,154,0.12)", tension: 0.3, fill: true },
        { label: "CO", data: co.length ? co : [0], borderColor: "#F59E0B", backgroundColor: "rgba(245,158,11,0.12)", tension: 0.3, fill: true },
      ]
    };
  }, [history]);

  useEffect(() => {
    if (!session && history.length) setSession(history[0]);
  }, [history, session]);

  return (
    <div className="flex min-h-screen bg-primary text-gray-100">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(s => !s)} />
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">Combustion Dashboard</h1>
            <p className="text-sm text-slate-300">Real-time analysis — save and track sessions</p>
          </div>
          <div className="flex gap-2">
            <button onClick={clearHistory} className="px-3 py-2 rounded bg-[#02242f] text-slate-200 border border-slate-700">Clear History</button>
            <button onClick={() => window.print()} className="px-3 py-2 rounded bg-accent text-[#021217] font-semibold">Print</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-1 bg-[#071827] p-4 rounded-2xl border border-slate-800 shadow">
            <h2 className="text-lg font-semibold mb-3">Process Inputs</h2>
            <label className="text-xs text-slate-300">Fuel Type</label>
            <select name="fuelType" value={inputs.fuelType} onChange={onChange} className="w-full mb-3 mt-1 p-2 rounded bg-[#041226] border border-slate-700 text-gray-100">
              {FUEL_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <label className="text-xs text-slate-300">Fuel Flow</label>
            <input name="fuelFlow" value={inputs.fuelFlow} onChange={onChange} type="number" className="w-full mb-3 mt-1 p-2 rounded bg-[#041226] border border-slate-700 text-gray-100" />
            <label className="text-xs text-slate-300">Air Flow</label>
            <input name="airFlow" value={inputs.airFlow} onChange={onChange} type="number" className="w-full mb-3 mt-1 p-2 rounded bg-[#041226] border border-slate-700 text-gray-100" />
            <label className="text-xs text-slate-300">Temperature (°C)</label>
            <input name="temperature" value={inputs.temperature} onChange={onChange} type="number" className="w-full mb-3 mt-1 p-2 rounded bg-[#041226] border border-slate-700 text-gray-100" />
            <label className="text-xs text-slate-300">Pressure (bar)</label>
            <input name="pressure" value={inputs.pressure} onChange={onChange} type="number" className="w-full mb-4 mt-1 p-2 rounded bg-[#041226] border border-slate-700 text-gray-100" />
            <button onClick={analyzeAndSave} className="w-full py-2 rounded bg-accent text-[#021217] font-semibold mb-2 hover:bg-[#00b37a]">Analyze & Save</button>
          </section>

          <div className="lg:col-span-2 space-y-4 printable-area">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#02171f] to-[#02242f] border border-slate-700">
                <div className="text-sm text-slate-300">CO₂ (kg/hr)</div>
                <div className="text-2xl font-bold text-[#00C49A]">{session ? session.results.CO2 : "--"}</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#161116] to-[#221718] border border-slate-700">
                <div className="text-sm text-slate-300">CO (kg/hr)</div>
                <div className="text-2xl font-bold text-[#F59E0B]">{session ? session.results.CO : "--"}</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#2a0e0e] to-[#381313] border border-slate-700">
                <div className="text-sm text-slate-300">Carbon (kg/hr)</div>
                <div className="text-2xl font-bold text-[#EF4444]">{session ? session.results.carbon : "--"}</div>
              </div>
            </div>

            <div className="p-4 bg-[#041226] rounded-2xl border border-slate-800">
              <h3 className="text-sm text-slate-300 mb-2">Latest Emission Breakdown</h3>
              {barData ? <Bar data={barData} options={{ animation: { duration: 800 }, responsive: true }} /> : <div className="text-slate-400">No analysis yet</div>}
            </div>

            <div className="p-4 bg-[#041226] rounded-2xl border border-slate-800">
              <h3 className="text-sm text-slate-300 mb-2">Historical Trends</h3>
              <Line data={lineData} options={{ animation: { duration: 900 }, responsive: true }} />
            </div>

            {session && (
              <div className="p-4 bg-[#071224] rounded-xl border border-slate-700">
                <h3 className="text-white font-semibold mb-2">Recommendations</h3>
                <ul className="list-disc list-inside text-slate-300">
                  {session.results.recommendations.map((r, i) => <li key={i} className="mb-1">{r}</li>)}
                </ul>
                <div className="mt-3 text-xs text-slate-500">Analyzed at: {session.ts}</div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-[#071827] rounded-md p-3 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm text-slate-300 font-semibold">Saved Sessions</h4>
            <div className="text-xs text-slate-400">{history.length} sessions</div>
          </div>

          <div className="space-y-2 max-h-48 overflow-auto">
            {history.length === 0 && <div className="text-slate-400 text-sm">No sessions yet — run an analysis to save.</div>}
            {history.map(h => (
              <button key={h.id} onClick={() => setSession(h)} className="w-full text-left p-2 rounded hover:bg-slate-800 transition flex items-center justify-between">
                <div>
                  <div className="text-sm">{h.inputs.fuelType} — {h.ts}</div>
                  <div className="text-xs text-slate-400">{h.results.CO2} kg CO₂</div>
                </div>
                <div className="text-xs text-slate-400">View</div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
