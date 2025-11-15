import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(true);

  // ✅ Create axios instance with credentials + correct base URL
  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
  });

  // ✅ Register user
  const register = async (name, email, password) => {
    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      return data;
    } catch (error) {
      console.error("❌ Registration failed:", error.response?.data || error.message);
      throw error;
    }
  };

  // ✅ Login user
  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      return data;
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error.message);
      throw error;
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // ✅ Load stored user on refresh
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored?.token) setUser(stored);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
