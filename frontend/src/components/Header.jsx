import { useAuth } from "../context/AuthContext";
import { FiUser } from "react-icons/fi";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      <h1 className="text-xl font-bold text-gray-700">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 font-semibold">{user?.name}</span>
        <FiUser className="text-gray-600 text-2xl" />
      </div>
    </header>
  );
}
