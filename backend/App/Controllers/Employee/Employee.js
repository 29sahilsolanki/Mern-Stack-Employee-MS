const { EmployeeModel } = require("../../Models/EmployeeModel");

const employeedetails = async (req, res) => {
  try {
    const { id } = req.user;
    const employeeRes = await EmployeeModel.findById(id);
    return res
      .status(200)
      .json({ status: true, message: "employee found", employeeRes });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to find employee",
      error: error.message,
    });
  }
};

module.exports = { employeedetails };
