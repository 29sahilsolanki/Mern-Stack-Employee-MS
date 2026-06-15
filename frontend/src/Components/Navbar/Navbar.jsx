import { useAuth } from "../../Context/AdminContext";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

export default function Navbar() {
  const { setIsOpen, isOpen, employeeLogout, role } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    setTimeout(() => {
      employeeLogout();
      navigate("/login");
    }, 2000);
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b flex justify-between items-center bg-indigo-700 py-4 px-2 md:px-10">
      <div className="flex items-center gap-5">
        {isOpen ? (
          <RxCross1
            size={25}
            className="text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <GiHamburgerMenu
            size={25}
            className="text-white cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        )}
        <Link
          to={`${role === "admin" ? "/admin-dashboard" : "/employee-dashboard"}`}
          className="text-2xl font-bold text-white"
        >
          Employee MS
        </Link>
      </div>

      <button
        className="bg-red-500 px-4 py-1 text-white rounded-md cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
