import { useEmployee } from "../../../Context/EmployeeContext";

export default function EmployeeLeaves() {
  const { leave, leaveDate, insertEmpLeave, setLeaveDate } = useEmployee();

  function handleLeave(e) {
    e.preventDefault(); // prevent page reload
    insertEmpLeave();
  }

  return (
    <div className="flex flex-col items-center space-y-12 bg-gray-100 min-h-170 p-6">
      {/* Apply Leave Card */}
      <div className="w-full mt-8 max-w-6xl bg-gradient-to-r from-indigo-50 to-indigo-100 shadow-xl rounded-lg p-8 border border-indigo-200">
        <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Apply Leave
        </h1>

        <form onSubmit={handleLeave}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <input
                type="date"
                value={leaveDate.from}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                onChange={(e) =>
                  setLeaveDate({ ...leaveDate, from: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <input
                type="date"
                value={leaveDate.to}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                onChange={(e) =>
                  setLeaveDate({ ...leaveDate, to: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason
              </label>
              <input
                type="text"
                value={leaveDate.reason}
                placeholder="Reason for leave..."
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                onChange={(e) =>
                  setLeaveDate({ ...leaveDate, reason: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition duration-200 shadow-md"
            >
              Apply Leave
            </button>
          </div>
        </form>
      </div>

      {/* Applied Leaves Table */}
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-lg p-8 border border-gray-300">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Applied Leaves
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-indigo-700">
                  From
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-indigo-700">
                  To
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-indigo-700">
                  Reason
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-indigo-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {leave
                .sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn))
                .slice(0, 5)
                .map((p) => (
                  <tr key={p._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {p.startDate &&
                        new Date(p.startDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {p.endDate &&
                        new Date(p.endDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {p.reason}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs font-semibold
                          ${p.status === "approved" ? "bg-green-500" : ""}
                          ${p.status === "pending" ? "bg-yellow-500" : ""}
                          ${p.status === "rejected" ? "bg-red-500" : ""}`}
                      >
                        {p.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
