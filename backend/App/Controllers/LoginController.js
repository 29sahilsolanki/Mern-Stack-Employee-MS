const { EmployeeModel } = require("../Models/EmployeeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        status: false,
        message: "user doesn't exist, Register yourself",
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(403).json({
        status: false,
        message: "Unauthorized, Incorrect password entered",
      });
    }

    const jwtToken = jwt.sign(
      {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      process.env.SECRET_ID,
      { expiresIn: "24h" },
    );

    return res.status(200).json({
      status: true,
      message: "login successfully",
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      jwtToken,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

module.exports = { loginEmployee };
