import { useAuth } from "../../../Context/AdminContext";

export default function Employees() {
  const { data } = useAuth();

  const medicalDept = data.filter((p) => p.department === "medical").length;
  const trainingDept = data.filter((p) => p.department === "training").length;
  const technicalDept = data.filter((p) => p.department === "technical").length;
  const gamingDept = data.filter((p) => p.department === "gaming").length;
  const qualityDept = data.filter((p) => p.department === "quality").length;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-indigo-600">
        Employees
      </h1>

      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-md text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Employee ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Salary</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p, idx) => (
              <tr
                key={p._id}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-indigo-50"} hover:bg-indigo-100`}
              >
                <td className="px-4 py-2">{p.employeeId}</td>
                <td className="px-4 py-2 font-medium">{p.name}</td>
                <td className="px-4 py-2">{p.department}</td>
                <td className="px-4 py-2">{p.role}</td>
                <td className="px-4 py-2">₹{p.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="sm:hidden space-y-4">
        {data.map((p) => (
          <div key={p._id} className="p-4 border rounded shadow bg-white">
            <p className="font-semibold">{p.name}</p>
            <p className="text-sm text-gray-600">ID: {p.employeeId}</p>
            <p className="text-sm text-gray-600">Dept: {p.department}</p>
            <p className="text-sm text-gray-600">Role: {p.role}</p>
            <p className="text-sm text-gray-600">Salary: ₹{p.salary}</p>
          </div>
        ))}
      </div>

      {/* Department Summary */}
      <h1 className="text-xl sm:text-2xl font-bold mb-4 mt-7 text-indigo-600">
        Department Summary
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 text-blue-700 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Medical</p>
          <p className="text-2xl font-bold">{medicalDept}</p>
        </div>
        <div className="bg-green-100 text-green-700 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Training</p>
          <p className="text-2xl font-bold">{trainingDept}</p>
        </div>
        <div className="bg-purple-100 text-purple-700 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Technical</p>
          <p className="text-2xl font-bold">{technicalDept}</p>
        </div>
        <div className="bg-pink-100 text-pink-700 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Gaming</p>
          <p className="text-2xl font-bold">{gamingDept}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Quality</p>
          <p className="text-2xl font-bold">{qualityDept}</p>
        </div>
        <div className="bg-indigo-100 text-indigo-700 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Total Employees</p>
          <p className="text-2xl font-bold">{data.length}</p>
        </div>
      </div>
    </div>
  );
}
