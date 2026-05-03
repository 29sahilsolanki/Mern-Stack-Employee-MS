import { useEmployee } from "../../../Context/EmployeeContext";

export default function EmployeeAttendance() {
  const {
    employee,
    attendance,
    setDate,
    attendanceByDate,
    attByDate,
    insertAttendance,
    employeeDetails,
  } = useEmployee();

  function handleAttendance(status) {
    insertAttendance(status);
    employeeDetails();
  }

  // check if today's attendance already marked
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const alreadyMarked = attendance.some(
    (a) => new Date(a.date).setHours(0, 0, 0, 0) === today.getTime(),
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Responsive layout for attendance cards */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Attendance Marking Card */}
        <div className="w-full md:flex-1 bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
            Mark Today's Attendance
          </h1>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Employee Id:</span>{" "}
            {employee?.employeeId}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Name:</span> {employee?.name}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Email:</span> {employee?.email}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              disabled={alreadyMarked}
              className={`flex-1 py-2 rounded-md transition-colors duration-300 
                ${alreadyMarked ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"}`}
              onClick={() => handleAttendance("present")}
            >
              Mark Present
            </button>
            <button
              type="button"
              disabled={alreadyMarked}
              className={`flex-1 py-2 rounded-md transition-colors duration-300 
                ${alreadyMarked ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"}`}
              onClick={() => handleAttendance("absent")}
            >
              Mark Absent
            </button>
          </div>
          {alreadyMarked && (
            <p className="text-sm text-gray-600 mt-2 italic">
              Attendance already marked for today.
            </p>
          )}
        </div>

        {/* Previous Attendance Card */}
        <div className="w-full md:flex-1 bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-indigo-700 mb-4">
            Previous Attendances
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
                <span className="font-semibold">Status:</span>{" "}
                {emp.status.toUpperCase()}
              </div>
            ))}
        </div>
      </div>

      {/* View Attendance By Date */}
      <div className="flex justify-center mt-10">
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 max-w-3xl w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-5 text-center">
            View Attendance By Date
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-4">
            <input
              type="date"
              required
              className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
              onChange={(e) => setDate(e.target.value)}
            />
            <button
              type="button"
              className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 transition w-full sm:w-auto"
              onClick={() => {
                attendanceByDate();
              }}
            >
              Find Attendance
            </button>
          </div>
          {attByDate.length > 0 ? (
            <div className="space-y-3">
              {attByDate.map((p) => (
                <div
                  key={p._id}
                  className="p-4 bg-indigo-50 rounded-md shadow-sm flex flex-col sm:flex-row justify-between items-center"
                >
                  <div className="text-sm sm:text-base">
                    <p className="text-gray-700">
                      <span className="font-semibold">Date:</span>{" "}
                      {p.date
                        ? new Date(p.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Status:</span>{" "}
                      {p.status ? p.status.toUpperCase() : "N/A"}
                    </p>
                  </div>
                  <span
                    className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-xs font-semibold text-white
                      ${p.status === "present" ? "bg-green-500" : ""}
                      ${p.status === "absent" ? "bg-red-500" : ""}`}
                  >
                    {p.status ? p.status.toUpperCase() : "N/A"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center mt-4">
              No attendance record found for this date.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
