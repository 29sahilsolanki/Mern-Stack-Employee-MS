import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import EmployeeSidebar from "./EmployeeSidebar";

export default function EmployeeDashboard() {
  return (
    <div className="flex h-screen">
      <div>
        <EmployeeSidebar />
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
