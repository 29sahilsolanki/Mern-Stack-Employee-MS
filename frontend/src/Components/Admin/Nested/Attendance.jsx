import { useAuth } from "../../../Context/AdminContext";

export default function Attendance() {
  const { attendance, updateAttendance, setDate } = useAuth();

  const statusPending = attendance.filter((p) => p.status === "pending").length;
  const statusPresent = attendance.filter((p) => p.status === "present").length;
  const statusAbsent = attendance.filter((p) => p.status === "absent").length;

  function handleButton(id, status) {
    updateAttendance(id, status);
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-indigo-600">
          Update Existing Attendance
        </h1>
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-indigo-500 
               focus:border-indigo-500 text-sm text-gray-700"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-md text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Employee ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((mark, idx) => (
              <tr
                key={mark._id}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-indigo-50"} hover:bg-indigo-100`}
              >
                <td className="px-4 py-2">{mark?.employee?.employeeId}</td>
                <td className="px-4 py-2 font-medium">
                  {mark?.employee?.name}
                </td>
                <td className="px-4 py-2">
                  {new Date(mark?.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      mark?.status === "present"
                        ? "bg-green-100 text-green-700"
                        : mark?.status === "absent"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {mark?.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="px-3 py-1 rounded text-white bg-green-500 hover:bg-green-600 disabled:bg-green-300"
                    disabled={mark?.status === "present"}
                    onClick={() => handleButton(mark._id, "present")}
                  >
                    Present
                  </button>
                  <button
                    className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600 disabled:bg-red-300"
                    disabled={mark?.status === "absent"}
                    onClick={() => handleButton(mark._id, "absent")}
                  >
                    Absent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="sm:hidden space-y-4">
        {attendance.map((mark) => (
          <div key={mark._id} className="p-4 border rounded shadow bg-white">
            <p className="font-semibold">{mark?.employee?.name}</p>
            <p className="text-sm text-gray-600">
              ID: {mark?.employee?.employeeId}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(mark?.date).toLocaleDateString("en-IN")}
            </p>
            <span
              className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                mark?.status === "present"
                  ? "bg-green-100 text-green-700"
                  : mark?.status === "absent"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {mark?.status}
            </span>
            <div className="flex gap-2 mt-3">
              <button
                className="flex-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
                disabled={mark?.status === "present"}
                onClick={() => handleButton(mark._id, "present")}
              >
                Present
              </button>
              <button
                className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300"
                disabled={mark?.status === "absent"}
                onClick={() => handleButton(mark._id, "absent")}
              >
                Absent
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <h1 className="text-xl sm:text-2xl font-bold mb-6 mt-10 text-indigo-600">
        Attendance Summary
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-green-100 text-green-700 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Employees Present</p>
          <p className="text-2xl font-bold">{statusPresent}</p>
        </div>
        <div className="bg-red-100 text-red-700 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Employees Absent</p>
          <p className="text-2xl font-bold">{statusAbsent}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Not Marked Yet</p>
          <p className="text-2xl font-bold">{statusPending}</p>
        </div>
      </div>
    </div>
  );
}
