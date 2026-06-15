import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import EmployeeSidebar from "./EmployeeSidebar";
import { useAuth } from "../../Context/AdminContext";
import Footer from "../Footer/Footer";

export default function EmployeeDashboard() {
  const { isOpen, setIsOpen } = useAuth();
  return (
    <div>
      <div>
        <Navbar />
        {isOpen ? <EmployeeSidebar /> : ""}
      </div>
      <div className={`mt-16 ${isOpen ? "ml-64" : ""}`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
