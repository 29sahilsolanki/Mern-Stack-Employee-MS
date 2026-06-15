import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AdminContext";

export default function EmployeeSidebar() {
  const { isOpen } = useAuth();

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
      <div className="flex-1 p-4 space-y-2 mt-8">
        <NavLink
          to="/employee-dashboard"
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
          to="attendance"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive ? "bg-indigo-900 font-semibold" : "hover:bg-indigo-800"
            }`
          }
        >
          Mark Attedance
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
