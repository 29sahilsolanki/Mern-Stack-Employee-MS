import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AdminContext";

export default function AdminSidebar() {
  const { isOpen } = useAuth();

  return (
    <div
      className={`
        h-screen w-64 bg-indigo-700 text-white flex flex-col
        ${isOpen ? "hidden" : "block"}   /* mobile toggle */
        sm:flex                         /* always visible on sm+ */
        transition-all duration-300
      `}
    >
      <div className="p-6">
        <h3 className="text-2xl font-bold">Employee MS</h3>
      </div>

      <div className="flex-1 p-4 space-y-2">
        <NavLink
          to="/admin-dashboard"
          end
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-indigo-900 font-semibold" : "hover:bg-indigo-800"
            }`
          }
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
        >
          Settings
        </NavLink>
      </div>
    </div>
  );
}
