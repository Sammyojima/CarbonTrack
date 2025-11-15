import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate(); // ✅ initialize navigate
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [message, setMessage] = useState("");

  const checkStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) setStrength("Weak");
    else if (score === 2) setStrength("Fair");
    else if (score === 3) setStrength("Good");
    else setStrength("Strong");
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    checkStrength(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await register(name, email, password); // register and update AuthContext
      setMessage("Registration successful!");
      navigate("/dashboard"); // ✅ auto-redirect to dashboard
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className={`text-sm font-semibold ${
            strength === "Weak" ? "text-red-500" :
            strength === "Fair" ? "text-yellow-500" :
            strength === "Good" ? "text-blue-500" :
            "text-green-500"
          }`}>
            Password Strength: {strength}
          </p>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
