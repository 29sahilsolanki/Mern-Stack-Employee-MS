import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AdminContext";

export default function EmployeeSidebar() {
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
      <div className="flex-1 p-4 space-y-2 mt-8">
        <NavLink
          to="/employee-dashboard"
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
          to="attendance"
          onClick={() => setIsOpen(false)}
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
          onClick={() => setIsOpen(false)}
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
          onClick={() => setIsOpen(false)}
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
