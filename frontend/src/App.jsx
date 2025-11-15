import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Correct relative path
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddData from "./pages/AddData";
import Reports from "./pages/Reports";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* Show Navbar only if NOT on Login/Register */}
      {window.location.pathname !== "/login" &&
       window.location.pathname !== "/register" && <Navbar />}

      <div className="min-h-screen bg-background text-textPrimary">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/add" element={user ? <AddData /> : <Navigate to="/login" />} />
          <Route path="/reports" element={user ? <Reports /> : <Navigate to="/login" />} />
        </Routes>
      </div>

      {/* Show footer only if NOT on Login/Register */}
      {window.location.pathname !== "/login" &&
       window.location.pathname !== "/register" && <Footer />}
    </>
  );
}
