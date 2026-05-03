const { AttendanceModel } = require("../../Models/AttendanceModel");

const employeeAttendance = async (req, res) => {
  try {
    const { id } = req.user;
    const attendanceRes = await AttendanceModel.find({ employee: id });
    return res.status(200).json({
      status: true,
      message: "Employee attendance details",
      attendanceRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to find attendance details",
      error: error.message,
    });
  }
};

const insertAttendance = async (req, res) => {
  try {
    const { id } = req.user;
    const { status } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const attendanceRes = new AttendanceModel({
      employee: id,
      status,
      date: today,
    });
    const savedRes = await attendanceRes.save();
    return res.status(201).json({
      status: true,
      message: "Your attendance has been marked",
      savedRes,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        message: "Attendance already marked for today",
      });
    }
    return res.status(500).json({
      status: false,
      message: "failed to mark attendance",
      error: error.message,
    });
  }
};

const attendanceByDate = async (req, res) => {
  try {
    const { id } = req.user;
    const { date } = req.query;
    const normalizeDate = new Date(date);
    normalizeDate.setHours(0, 0, 0, 0);
    const findRes = await AttendanceModel.find({
      employee: id,
      date: normalizeDate,
    });
    if (!findRes || findRes.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No attendance record found for given date",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Attendance record found of given date",
      findRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { employeeAttendance, insertAttendance, attendanceByDate };
