import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminSummary from "./Components/Admin/Nested/AdminSummary";
import Employees from "./Components/Admin/Nested/Employees";
import Attendance from "./Components/Admin/Nested/Attendance";
import Leaves from "./Components/Admin/Nested/Leaves";
import Salary from "./Components/Admin/Nested/Salary";
import Settings from "./Components/Admin/Nested/Settings";
import { AdminProvider } from "./Context/AdminContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeDashboard from "./Components/Employee/EmployeeDashboard";
import AdminRoute from "./Routes/AdminRoute";
import EmployeeRoute from "./Routes/EmployeeRoute";
import PublicRoute from "./Routes/PublicRoute";
import EmployeeSummary from "./Components/Employee/Nested/EmployeeSummary";
import EmployeeAttendance from "./Components/Employee/Nested/EmployeeAttendance";
import EmployeeLeaves from "./Components/Employee/Nested/EmployeeLeaves";
import EmployeeSettings from "./Components/Employee/Nested/EmployeeSettings";
import { EmployeeProvider } from "./Context/EmployeeContext";

function App() {
  return (
    <AdminProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="employees" element={<Employees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="salary" element={<Salary />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route
          path="/employee-dashboard"
          element={
            <EmployeeRoute>
              <EmployeeProvider>
                <EmployeeDashboard />
              </EmployeeProvider>
            </EmployeeRoute>
          }
        >
          <Route index element={<EmployeeSummary />} />
          <Route path="attendance" element={<EmployeeAttendance />} />
          <Route path="leaves" element={<EmployeeLeaves />} />
          <Route path="settings" element={<EmployeeSettings />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </AdminProvider>
  );
}

export default App;
