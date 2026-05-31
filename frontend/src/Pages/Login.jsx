import { Link } from "react-router-dom";
import { useAuth } from "../Context/AdminContext";

export default function Login() {
  const { input, setInput, employeeLogin, loading } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    employeeLogin();
  }

  // Demo login handler
  function handleUserLogin() {
    employeeLogin({ email: "sahil@gmail.com", password: "12345" });
  }

  function handleAdminLogin() {
    employeeLogin({ email: "admin@gmail.com", password: "admin" });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
      {/* Fullscreen Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-indigo-600 bg-opacity-30 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-b-4 border-white"></div>
        </div>
      )}
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Employee Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
          >
            Login
          </button>
          {/* Demo Login Button */}
          <div className="flex justify-between gap-4 w-full mt-3">
            <button
              type="button"
              onClick={handleUserLogin}
              className="cursor-pointer w-1/2 bg-gray-200 text-gray-800 font-semibold py-2 rounded-md shadow-md hover:bg-gray-300 transition-transform transform hover:scale-105"
            >
              Login as user
            </button>
            <button
              type="button"
              onClick={handleAdminLogin}
              className="cursor-pointer w-1/2 bg-gray-200 text-gray-800 font-semibold py-2 rounded-md shadow-md hover:bg-gray-300 transition-transform transform hover:scale-105 "
            >
              Login as admin
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Not registered?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
