import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import AdminSidebar from "./AdminSidebar";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen">
      <div>
        <AdminSidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-20 bg-indigo-700">
          <Navbar />
        </div>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
