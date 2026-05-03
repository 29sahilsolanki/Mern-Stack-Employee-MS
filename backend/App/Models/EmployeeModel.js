const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    department: {
      type: String,
      enum: ["medical", "training", "technical", "gaming", "quality"],
      required: true,
    },
    employeeId: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true },
);

const EmployeeModel = mongoose.model("Employee", Schema);

module.exports = { EmployeeModel };
