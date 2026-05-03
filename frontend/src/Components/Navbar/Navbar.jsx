import { FaBars } from "react-icons/fa";
import { useAuth } from "../../Context/AdminContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { name, setIsOpen, isOpen, employeeLogout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    setTimeout(() => {
      employeeLogout();
      navigate("/login");
    }, 2000);
  }

  return (
    <div className="flex justify-between items-center bg-indigo-700 p-6">
      {/* Menu icon only on small screens */}
      <FaBars
        className="text-2xl text-white cursor-pointer md:hidden"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      {isOpen && (
        <>
          <p className="text-lg text-white">Welcome: {name}</p>

          <button
            className="bg-red-500 px-4 py-1 text-white rounded-md cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
            onClick={handleLogout}
          >
            logout
          </button>
        </>
      )}
    </div>
  );
}
