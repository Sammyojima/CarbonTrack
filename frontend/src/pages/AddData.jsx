import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function AddData() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    date: "",
    naturalGasFlow: "",
    reformerTemp: "",
    steamToCarbonRatio: "",
  });

  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState("");

  // Handle manual input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle CSV upload
  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      let response;

      if (csvFile) {
        // Upload CSV
        const formDataCSV = new FormData();
        formDataCSV.append("file", csvFile);

        response = await axios.post(
          "https://carbontrack-api.onrender.com/api/data/upload",
          formDataCSV,
          {
            headers: { 
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.token}`
            },
          }
        );
      } else {
        // Submit manual input
        response = await axios.post(
          "https://carbontrack-api.onrender.com/api/data",
          formData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
      }

      setMessage("Data submitted successfully!");
      setFormData({ date: "", naturalGasFlow: "", reformerTemp: "", steamToCarbonRatio: "" });
      setCsvFile(null);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to submit data");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Add Process Data</h2>

      {message && (
        <p className={`mb-4 text-center font-semibold ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}

      {/* CSV Upload */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Upload CSV:</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="border p-2 rounded-lg w-full"
        />
      </div>

      <p className="text-gray-500 mb-4">Or enter data manually:</p>

      {/* Manual Input Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="number"
          step="0.01"
          name="naturalGasFlow"
          placeholder="Natural Gas Flow (Nm³)"
          value={formData.naturalGasFlow}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="number"
          step="0.1"
          name="reformerTemp"
          placeholder="Reformer Temperature (°C)"
          value={formData.reformerTemp}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />
        <input
          type="number"
          step="0.01"
          name="steamToCarbonRatio"
          placeholder="Steam-to-Carbon Ratio"
          value={formData.steamToCarbonRatio}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          className="col-span-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Submit Data
        </button>
      </form>
    </div>
  );
}
