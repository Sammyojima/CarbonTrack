import { useEffect, useState } from "react";

export default function Reports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch CO2 data from your backend API
    const fetchData = async () => {
      try {
        // Example GET request
        // const res = await api.get("/data");
        // setData(res.data);
        setData([
          { id: 1, co2: 120, source: "Hydrogen Plant A" },
          { id: 2, co2: 95, source: "Hydrogen Plant B" },
        ]);
      } catch (err) {
        console.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading data...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">CO₂ Emission Reports</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Source / Plant</th>
            <th className="border border-gray-300 px-4 py-2">CO₂ Emission (kg)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{item.source}</td>
              <td className="border border-gray-300 px-4 py-2">{item.co2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
