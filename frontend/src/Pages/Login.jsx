import { Link } from "react-router-dom";
import { useAuth } from "../Context/AdminContext";

export default function Login() {
  const { input, setInput, employeeLogin } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    employeeLogin();
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
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
