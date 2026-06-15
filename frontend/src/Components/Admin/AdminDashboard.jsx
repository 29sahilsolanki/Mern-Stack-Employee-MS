import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../../Context/AdminContext";
import AdminFooter from "./AdminFooter";

export default function AdminDashboard() {
  const { isOpen } = useAuth();

  return (
    <div className="bg-gray-100">
      <div>
        <Navbar />
        {isOpen ? <AdminSidebar /> : ""}
      </div>
      <div className="flex justify-center items-center">
        <div
          className={`mt-16 min-h-150 w-full max-w-6xl ${isOpen ? "ml-64" : ""}`}
        >
          <Outlet />
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}
