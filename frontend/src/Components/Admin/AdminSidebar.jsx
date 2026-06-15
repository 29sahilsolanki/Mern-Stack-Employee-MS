import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AdminContext";

export default function AdminSidebar() {
  const { isOpen, setIsOpen } = useAuth();

  return (
    <div
      className={`
    fixed top-10 left-0 h-[calc(120vh-80px)] w-64
    bg-indigo-700 text-white flex flex-col
    sm:flex
    transition-all duration-300
    z-40
  `}
    >
      <div className="flex-1 p-4 space-y-2 mt-10">
        <NavLink
          to="/admin-dashboard"
          end
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-indigo-900 font-semibold" : "hover:bg-indigo-800"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="employees"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-indigo-900 font-semibold" : "hover:bg-indigo-800"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          Employees
        </NavLink>
        <NavLink
          to="attendance"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-indigo-900 font-semibold" : "hover:bg-indigo-800"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          Mark Attendance
        </NavLink>
        <NavLink
          to="leaves"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-indigo-900 font-semibold" : "hover:bg-indigo-800"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          Leaves
        </NavLink>
        <NavLink
          to="salary"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-indigo-900 font-semibold" : "hover:bg-indigo-800"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          Salary
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-indigo-900 font-semibold" : "hover:bg-indigo-800"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          Settings
        </NavLink>
      </div>
    </div>
  );
}
