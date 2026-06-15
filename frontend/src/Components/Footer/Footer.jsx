import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-indigo-800 text-indigo-100 border-t border-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left gap-6">
          {/* Logo */}
          <div>
            <h3 className="text-white font-bold text-xl">Employee MS</h3>
            <p className="text-sm text-indigo-200">
              Employee Management System
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm font-medium">
            <Link
              to="/employee-dashboard"
              className="hover:text-white transition-colors"
            >
              Dashboard
            </Link>

            <Link
              to="/employee-dashboard/attendance"
              className="hover:text-white transition-colors"
            >
              Attendance
            </Link>

            <Link
              to="/employee-dashboard/leaves"
              className="hover:text-white transition-colors"
            >
              Leaves
            </Link>

            <Link
              to="/employee-dashboard/settings"
              className="hover:text-white transition-colors"
            >
              Settings
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-xs sm:text-sm text-indigo-200 text-center md:text-right">
            <p>© {new Date().getFullYear()} Employee MS</p>
            <p>Built with React • Node.js • MERN</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
