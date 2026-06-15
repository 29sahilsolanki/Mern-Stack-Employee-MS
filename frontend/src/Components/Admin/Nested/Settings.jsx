import { useAuth } from "../../../Context/AdminContext";

export default function Settings() {
  const {
    query,
    setQuery,
    fetchSingleEmployee,
    singleEmployee,
    email,
    setEmail,
    appliedLeaveDetails,
    empAppliedLeave,
    deleteLeaveRecord,
    deleteEmployee,
  } = useAuth();

  function handleSearch(e) {
    e.preventDefault();
    fetchSingleEmployee();
  }

  function handleLeave(e) {
    e.preventDefault();
    appliedLeaveDetails();
  }

  function deleteLeave(id) {
    deleteLeaveRecord(id);
  }

  function handelDelete(id) {
    deleteEmployee(id);
  }

  return (
    <div className="min-h-160 p-6 flex flex-col items-center space-y-10">
      {/* Clear Employee Records */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg md:mt-20 p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Clear Employee Records
        </h1>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 w-full sm:w-auto">
              Search Employee
            </label>
            <input
              type="text"
              required
              placeholder="Enter Employee Id or Name..."
              value={query}
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Search
            </button>
          </div>
        </form>

        {/* Search Results */}
        {singleEmployee && singleEmployee.length > 0 && (
          <div className="mt-6 space-y-2">
            {singleEmployee.map((p) => (
              <div
                key={p._id}
                className="border border-gray-200 rounded-md p-4 bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <p>
                    <span className="font-medium">ID:</span> {p.employeeId}
                  </p>
                  <p>
                    <span className="font-medium">Name:</span> {p.name}
                  </p>
                  <p>
                    <span className="font-medium">Department:</span>{" "}
                    {p.department}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {p.email}
                  </p>
                </div>
                <button
                  type="button"
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  onClick={() => {
                    handelDelete(p._id);
                  }}
                >
                  Delete Employee
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Clear Leave Records */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Clear Leave Records
        </h1>
        <form onSubmit={handleLeave} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 w-full sm:w-auto">
              Enter Employee Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter employee email..."
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Search
            </button>
          </div>
        </form>

        {/* Leave Results */}
        {empAppliedLeave && empAppliedLeave.length > 0 && (
          <div className="mt-6 space-y-2">
            {empAppliedLeave.map((leave) => (
              <div
                key={leave._id}
                className="border border-gray-200 rounded-md p-4 bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <p>
                    <span className="font-medium">Employee ID:</span>{" "}
                    {leave?.employee?.employeeId}
                  </p>
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {leave?.employee?.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {leave?.employee?.email}
                  </p>
                  <p>
                    <span className="font-medium">Start Date:</span>{" "}
                    {new Date(leave.startDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  <p>
                    <span className="font-medium">End Date:</span>{" "}
                    {new Date(leave.endDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span> {leave.status}
                  </p>
                  <p>
                    <span className="font-medium">Reason:</span> {leave.reason}
                  </p>
                </div>
                <button
                  type="button"
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  onClick={() => {
                    deleteLeave(leave._id);
                  }}
                >
                  Delete Leave
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
