import { Link } from "react-router-dom";

export default function AdminFooter() {
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
              to="/admin-dashboard"
              className="hover:text-white transition-colors"
            >
              Dashboard
            </Link>

            <Link
              to="/admin-dashboard/employees"
              className="hover:text-white transition-colors"
            >
              Employees
            </Link>

            <Link
              to="/admin-dashboard/attendance"
              className="hover:text-white transition-colors"
            >
              Mark Attendance
            </Link>

            <Link
              to="/admin-dashboard/leaves"
              className="hover:text-white transition-colors"
            >
              Leaves
            </Link>
            <Link
              to="/admin-dashboard/salary"
              className="hover:text-white transition-colors"
            >
              Salary
            </Link>
            <Link
              to="/admin-dashboard/settings"
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
