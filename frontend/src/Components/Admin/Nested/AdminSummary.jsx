import { useAuth } from "../../../Context/AdminContext";

function SummaryCard({ title, value, color }) {
  return (
    <div className={`${color} p-3 rounded shadow text-center`}>
      <p className="text-xs sm:text-sm font-medium">{title}</p>
      <p className="text-base sm:text-lg font-bold">{value}</p>
    </div>
  );
}

export default function AdminSummary() {
  const { data, leaveData, attendance } = useAuth();

  const totalEmployees = data.length;
  const totalLeaves = leaveData.length;
  const salarySum = data
    .reduce((sum, emp) => sum + Number(emp.salary), 0)
    .toLocaleString("en-IN");

  const medicalDept = data
    .filter((p) => p.department === "medical")
    .reduce((sum, emp) => sum + Number(emp.salary), 0);
  const trainingDept = data
    .filter((p) => p.department === "training")
    .reduce((sum, emp) => sum + Number(emp.salary), 0);
  const technicalDept = data
    .filter((p) => p.department === "technical")
    .reduce((sum, emp) => sum + Number(emp.salary), 0);
  const gamingDept = data
    .filter((p) => p.department === "gaming")
    .reduce((sum, emp) => sum + Number(emp.salary), 0);
  const qualityDept = data
    .filter((p) => p.department === "quality")
    .reduce((sum, emp) => sum + Number(emp.salary), 0);

  //------------------attendance----------------------//
  const absent = attendance.filter((p) => p.status === "absent").length;
  const present = attendance.filter((p) => p.status === "present").length;
  const pending = attendance.filter((p) => p.status === "pending").length;
  const totalAttendance = present + absent;

  return (
    <div className="p-4 sm:p-6 space-y-10">
      {/* Top Overview */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold mb-4 text-indigo-600">
          Dashboard Overview
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Employees"
            value={totalEmployees}
            color="bg-indigo-100 text-indigo-700"
          />
          <SummaryCard
            title="Leaves Applied"
            value={totalLeaves}
            color="bg-yellow-100 text-yellow-700"
          />
          <SummaryCard
            title="Attendance Marked"
            value={totalAttendance}
            color="bg-green-100 text-green-700"
          />
          <SummaryCard
            title="Salary Expenditure"
            value={salarySum}
            color="bg-purple-100 text-purple-700"
          />
        </div>
      </div>

      {/* Attendance Section */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold mb-3 text-indigo-600">
          Attendance Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard
            title="Present"
            value={present}
            color="bg-green-100 text-green-700"
          />
          <SummaryCard
            title="Absent"
            value={absent}
            color="bg-red-100 text-red-700"
          />
          <SummaryCard
            title="Not Marked"
            value={pending}
            color="bg-yellow-100 text-yellow-700"
          />
        </div>
      </div>

      {/* Salary Section */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold mb-3 text-indigo-600">
          Salary Expenditure
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SummaryCard
            title="Medical Dept"
            value={medicalDept.toLocaleString("en-IN")}
            color="bg-blue-100 text-blue-700"
          />
          <SummaryCard
            title="Technical Dept"
            value={technicalDept.toLocaleString("en-IN")}
            color="bg-purple-100 text-purple-700"
          />
          <SummaryCard
            title="Training Dept"
            value={trainingDept.toLocaleString("en-IN")}
            color="bg-green-100 text-green-700"
          />
          <SummaryCard
            title="Gaming Dept"
            value={gamingDept.toLocaleString("en-IN")}
            color="bg-pink-100 text-pink-700"
          />
          <SummaryCard
            title="Quality Dept"
            value={qualityDept.toLocaleString("en-IN")}
            color="bg-yellow-100 text-yellow-700"
          />
          <SummaryCard
            title="Total Salary"
            value={salarySum.toLocaleString("en-IN")}
            color="bg-indigo-100 text-indigo-700"
          />
        </div>
      </div>
    </div>
  );
}
