import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AdminContext";
import { toast } from "react-toastify";

export default function Register() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    employeeId: "",
    department: "",
    salary: "",
    password: "",
  });

  const { token } = useAuth();
  const navigate = useNavigate();
  const registerEmployee = async () => {
    try {
      const url = "https://employee-ms-backend-2dci.onrender.com/ems/register-employee";
      const res = await axios.post(url, input, {
        headers: { Authorization: token },
      });
      toast.success(
        res?.data?.message || "Registration successful, you can login now",
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    registerEmployee();
    setInput({
      name: "",
      email: "",
      employeeId: "",
      department: "",
      salary: "",
      password: "",
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Employee Registration
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={input.name}
                onChange={(e) => setInput({ ...input, name: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Employee ID + Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Employee ID
              </label>
              <input
                type="text"
                placeholder="Enter your ID"
                value={input.employeeId}
                onChange={(e) =>
                  setInput({ ...input, employeeId: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Department
              </label>
              <select
                value={input.department}
                onChange={(e) =>
                  setInput({ ...input, department: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Department</option>
                <option value="medical">Medical</option>
                <option value="training">Training</option>
                <option value="technical">Technical</option>
                <option value="gaming">Gaming</option>
                <option value="quality">Quality</option>
              </select>
            </div>
          </div>

          {/* Salary + Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Annual Salary
              </label>
              <input
                type="number"
                placeholder="Enter your salary"
                value={input.salary}
                onChange={(e) => setInput({ ...input, salary: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already Registered?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
