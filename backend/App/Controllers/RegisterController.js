const { EmployeeModel } = require("../Models/EmployeeModel");
const bcrypt = require("bcrypt");
const registerEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      department,
      password,
      employeeId,
      salary,
      profileImage,
    } = req.body;
    const user = await EmployeeModel.findOne({ email });
    if (user) {
      return res.status(403).json({
        status: false,
        message: "email already exist, you can login",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const registerRes = new EmployeeModel({
      name,
      email,
      department,
      password: hashedPassword,
      employeeId,
      salary,
      profileImage,
    });
    const registeredUser = await registerRes.save();
    return res.status(201).json({
      status: true,
      message: "you have been registered successfully",
      registeredUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to register employee",
      error: error.message,
    });
  }
};

module.exports = { registerEmployee };
