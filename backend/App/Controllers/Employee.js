const { EmployeeModel } = require("../Models/EmployeeModel");

const fetchEmployee = async (req, res) => {
  try {
    const employeeRes = await EmployeeModel.find();
    return res
      .status(200)
      .json({ status: true, message: "all employee details", employeeRes });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "unable to fetch employee details",
      error: error.message,
    });
  }
};

module.exports = { fetchEmployee };
