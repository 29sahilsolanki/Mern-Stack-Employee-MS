const { AttendanceModel } = require("../Models/AttendanceModel");
const { EmployeeModel } = require("../Models/EmployeeModel");
const { LeaveModel } = require("../Models/LeaveModel");

const fetchSingleEmployee = async (req, res) => {
  try {
    const { query } = req.params;

    const findEmployee = await EmployeeModel.find({
      $or: [{ name: query }, { employeeId: query }],
    });

    if (!findEmployee || findEmployee.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No employee found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Employee record found",
      findEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to search employee",
      error: error.message,
    });
  }
};

const employeeAppliedLeaves = async (req, res) => {
  try {
    const { email } = req.query;
    const findUser = await EmployeeModel.findOne({ email });
    if (!findUser) {
      return res.status(404).json({
        status: false,
        message: "No employee found having this email",
      });
    }

    const findUserLeave = await LeaveModel.find({
      employee: findUser._id,
    }).populate("employee");

    if (!findUserLeave || findUserLeave.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No leave record found for this employee",
      });
    }
    return res
      .status(200)
      .json({ status: true, message: "Leave record found", findUserLeave });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to find records, try again",
      error: error.message,
    });
  }
};

const deleteEmployeeLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLeave = await LeaveModel.findByIdAndDelete(id);
    if (!deletedLeave) {
      return res.status(404).json({
        status: false,
        message: "Leave record not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Leave record deleted successfully",
      deletedLeave,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to delete leave record",
      error: error.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    // Step 1: Delete employee
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({
        status: false,
        message: "Employee not found",
      });
    }

    // Step 2: Delete related attendance
    await AttendanceModel.deleteMany({ employee: id });

    // Step 3: Delete related leaves
    await LeaveModel.deleteMany({ employee: id });

    return res.status(200).json({
      status: true,
      message: "Employee and related records deleted successfully",
      deletedEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to delete employee",
      error: error.message,
    });
  }
};

module.exports = {
  fetchSingleEmployee,
  employeeAppliedLeaves,
  deleteEmployeeLeave,
  deleteEmployee,
};
