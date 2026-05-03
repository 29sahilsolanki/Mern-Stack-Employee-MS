import { useEffect } from "react";
import { useEmployee } from "../../../Context/EmployeeContext";

export default function EmployeeSummary() {
  const {
    employee,
    attendance,
    leave,
    employeeDetails,
    employeeAttendance,
    empLeaveDetails,
  } = useEmployee();

  useEffect(() => {
    employeeDetails();
    employeeAttendance();
    empLeaveDetails();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-8 space-y-4 sm:space-y-0">
          {/* Profile Image */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-indigo-500">
            {employee?.profileImage ? (
              <img
                src={employee.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-2xl sm:text-3xl">
                {employee?.name?.charAt(0) || "?"}
              </div>
            )}
          </div>

          {/* Employee Info */}
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-4xl font-bold text-indigo-700 mb-2">
              {employee?.name}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-1">
              {employee?.email}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Employee ID:</span>{" "}
              {employee?.employeeId}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Department:</span>{" "}
              {employee?.department}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Joining Date:</span>{" "}
              {employee?.createdAt
                ? new Date(employee.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Account Overview */}
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-6xl mx-auto mt-6">
        <h1 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
          Account Overview
        </h1>

        {/* Responsive Cards */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Attendance Card */}
          <div className="w-full md:flex-1 bg-indigo-50 shadow-md rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-indigo-600 mb-4">
              Attendance
            </h2>
            {attendance
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5)
              .map((emp) => (
                <div
                  key={emp._id}
                  className="text-gray-700 mb-2 text-sm sm:text-base"
                >
                  <span className="font-semibold">Date:</span>{" "}
                  {emp.date
                    ? new Date(emp.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}{" "}
                  <span className="font-semibold">Status:</span> {emp.status}
                </div>
              ))}
          </div>

          {/* Leaves Card */}
          <div className="w-full md:flex-1 bg-indigo-50 shadow-md rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-indigo-600 mb-4">
              Applied Leaves
            </h2>
            {leave
              .sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn))
              .slice(0, 1)
              .map((p) => (
                <div
                  key={p._id}
                  className="text-gray-700 mb-2 text-sm sm:text-base"
                >
                  <span className="font-semibold">Applied On:</span>{" "}
                  {p.appliedOn &&
                    new Date(p.appliedOn).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  <br />
                  <span className="font-semibold">Reason:</span> {p.reason}
                  <br />
                  <span className="font-semibold">From:</span>{" "}
                  {p.startDate &&
                    new Date(p.startDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  <br />
                  <span className="font-semibold">To:</span>{" "}
                  {p.endDate &&
                    new Date(p.endDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  <br />
                  <span className="font-semibold">Status:</span> {p.status}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
