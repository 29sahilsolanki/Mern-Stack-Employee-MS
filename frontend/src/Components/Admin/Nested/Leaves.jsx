import { useState } from "react";
import { useAuth } from "../../../Context/AdminContext";

export default function Leaves() {
  const { leaveData, updateLeaves } = useAuth();

  const pendingCount = leaveData.filter(
    (leave) => leave.status === "pending",
  ).length;
  const approvedCount = leaveData.filter(
    (leave) => leave.status === "approved",
  ).length;
  const rejectedCount = leaveData.filter(
    (leave) => leave.status === "rejected",
  ).length;

  function handleUpdate(id, status) {
    updateLeaves(id, status);
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-indigo-600">
        Applied Leaves
      </h1>

      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-md text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Employee ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Reason</th>
              <th className="px-4 py-2 text-left">Start Date</th>
              <th className="px-4 py-2 text-left">End Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((leave, idx) => (
              <tr
                key={leave._id}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-indigo-50"} hover:bg-indigo-100`}
              >
                <td className="px-4 py-2">{leave?.employee?.employeeId}</td>
                <td className="px-4 py-2 font-medium">
                  {leave?.employee?.name}
                </td>
                <td className="px-4 py-2">{leave?.employee?.role}</td>
                <td className="px-4 py-2">{leave?.reason}</td>
                <td className="px-4 py-2">
                  {new Date(leave?.startDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-2">
                  {new Date(leave?.endDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      leave.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : leave.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {leave.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="px-3 py-1 rounded text-white bg-green-500 hover:bg-green-600 disabled:bg-green-300"
                    disabled={leave.status !== "pending"}
                    onClick={() => handleUpdate(leave._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600 disabled:bg-red-300"
                    disabled={leave.status !== "pending"}
                    onClick={() => handleUpdate(leave._id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="sm:hidden space-y-4">
        {leaveData.map((leave) => (
          <div key={leave._id} className="p-4 border rounded shadow bg-white">
            <p className="font-semibold">{leave?.employee?.name}</p>
            <p className="text-sm text-gray-600">{leave?.reason}</p>
            <p className="text-xs text-gray-500">
              {new Date(leave?.startDate).toLocaleDateString()} -{" "}
              {new Date(leave?.endDate).toLocaleDateString()}
            </p>
            <span
              className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                leave.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : leave.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {leave.status}
            </span>
            <div className="flex gap-2 mt-3">
              <button
                className="flex-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
                disabled={leave.status !== "pending"}
                onClick={() => handleUpdate(leave._id, "approved")}
              >
                Approve
              </button>
              <button
                className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300"
                disabled={leave.status !== "pending"}
                onClick={() => handleUpdate(leave._id, "rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold mb-6 mt-10 text-indigo-600">
          Leave Status
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded shadow text-center">
            <p className="text-lg font-semibold">Pending</p>
            <p className="text-2xl font-bold">{pendingCount}</p>
          </div>
          <div className="bg-green-100 text-green-700 p-4 rounded shadow text-center">
            <p className="text-lg font-semibold">Approved</p>
            <p className="text-2xl font-bold">{approvedCount}</p>
          </div>
          <div className="bg-red-100 text-red-700 p-4 rounded shadow text-center">
            <p className="text-lg font-semibold">Rejected</p>
            <p className="text-2xl font-bold">{rejectedCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
