import { useAuth } from "../../../Context/AdminContext";

export default function Salary() {
  const { data } = useAuth();
  const totalSalary = data.reduce((sum, emp) => sum + Number(emp.salary), 0);

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

  return (
    <div className="p-6 bg-gray-50 min-h-150">
      {/* Monthly Expenditure Card */}
      <div className="bg-indigo-600 text-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold">Monthly Expenditure</h1>
        <p className="text-3xl mt-2 font-semibold">
          ₹ {totalSalary.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Salary By Departments */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Salary By Departments
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Department Card */}
          <div className="group p-4 border rounded-lg hover:shadow-lg transition duration-200">
            <p className="text-gray-600 group-hover:text-indigo-600">Medical</p>
            <p className="text-lg font-semibold text-indigo-600 group-hover:text-indigo-700 group-hover:text-xl">
              ₹ {medicalDept.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="group p-4 border rounded-lg hover:shadow-lg transition duration-200">
            <p className="text-gray-600 group-hover:text-indigo-600">
              Training
            </p>
            <p className="text-lg font-semibold text-indigo-600 group-hover:text-indigo-700 group-hover:text-xl">
              ₹ {trainingDept.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="group p-4 border rounded-lg hover:shadow-lg transition duration-200">
            <p className="text-gray-600 group-hover:text-indigo-600">
              Technical
            </p>
            <p className="text-lg font-semibold text-indigo-600 group-hover:text-indigo-700 group-hover:text-xl">
              ₹ {technicalDept.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="group p-4 border rounded-lg hover:shadow-lg transition duration-200">
            <p className="text-gray-600 group-hover:text-indigo-600">Gaming</p>
            <p className="text-lg font-semibold text-indigo-600 group-hover:text-indigo-700 group-hover:text-xl">
              ₹ {gamingDept.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="group p-4 border rounded-lg hover:shadow-lg transition duration-200">
            <p className="text-gray-600 group-hover:text-indigo-600">Quality</p>
            <p className="text-lg font-semibold text-indigo-600 group-hover:text-indigo-700 group-hover:text-xl">
              ₹ {qualityDept.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
