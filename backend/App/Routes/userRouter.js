const express = require("express");
const { registerEmployee } = require("../Controllers/RegisterController");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/Validations");
const { loginEmployee } = require("../Controllers/LoginController");
const { ensureAuthenticated } = require("../Middlewares/Authentication");
const { fetchEmployee } = require("../Controllers/Employee");
const { verifyAdmin } = require("../Middlewares/VerifyAdmin");
const {
  updateAttendance,
  fetchAttByDate,
} = require("../Controllers/Attendance");
const { fetchLeaves, updateLeaves } = require("../Controllers/Leave");
const { employeedetails } = require("../Controllers/Employee/Employee");
const {
  insertAttendance,
  employeeAttendance,
  attendanceByDate,
} = require("../Controllers/Employee/Attendance");
const {
  empLeaveDetails,
  insertEmpLeave,
} = require("../Controllers/Employee/Leaves");
const {
  fetchSingleEmployee,
  employeeAppliedLeaves,
  deleteEmployeeLeave,
  deleteEmployee,
} = require("../Controllers/Delete");

const userRouter = express.Router();

//---------------register employee-----------------//
userRouter.post("/register-employee", signupValidation, registerEmployee);

//-----------------login employee-----------------//
userRouter.post("/login-employee", loginValidation, loginEmployee);

//----------------------------------Admin Section-------------------------------------//
//-----------------employee details--------------------//
userRouter.get("/employees", ensureAuthenticated, verifyAdmin, fetchEmployee);

//------------------attendance by date-------------------//
userRouter.get(
  "/attendanceby-date",
  ensureAuthenticated,
  verifyAdmin,
  fetchAttByDate,
);

//----------------Attendance Update-----------------//
userRouter.put(
  "/update-attendance/:id",
  ensureAuthenticated,
  verifyAdmin,
  updateAttendance,
);

//---------------fetch leaves-----------------//
userRouter.get("/leaves", ensureAuthenticated, verifyAdmin, fetchLeaves);

//--------------------update leaves--------------------//
userRouter.put(
  "/update-leaves",
  ensureAuthenticated,
  verifyAdmin,
  updateLeaves,
);

userRouter.get(
  "/search-employee/:query",
  ensureAuthenticated,
  verifyAdmin,
  fetchSingleEmployee,
);
//----------------------------------Admin Section-------------------------------------//

//-------------------------------employee section--------------------------------//

userRouter.get("/employee-details", ensureAuthenticated, employeedetails);

userRouter.get("/employee-attendance", ensureAuthenticated, employeeAttendance);

userRouter.post("/insert-attendance", ensureAuthenticated, insertAttendance);

userRouter.get("/attendancebydate", ensureAuthenticated, attendanceByDate);

userRouter.get("/empleave-details", ensureAuthenticated, empLeaveDetails);

userRouter.post("/apply-leaves", ensureAuthenticated, insertEmpLeave);

userRouter.get(
  "/applied-leave-details",
  ensureAuthenticated,
  verifyAdmin,
  employeeAppliedLeaves,
);
//-------------------------------employee section--------------------------------//

//------------------delete leaves--------------------//

userRouter.delete(
  "/delete-leaves/:id",
  ensureAuthenticated,
  verifyAdmin,
  deleteEmployeeLeave,
);

userRouter.delete(
  "/delete-employee/:id",
  ensureAuthenticated,
  verifyAdmin,
  deleteEmployee,
);

module.exports = { userRouter };
