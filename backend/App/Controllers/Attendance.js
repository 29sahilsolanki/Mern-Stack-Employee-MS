const { AttendanceModel } = require("../Models/AttendanceModel");

const fetchAttByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    const attendanceRes = await AttendanceModel.find({
      date: normalizedDate,
    }).populate("employee");
    if (!attendanceRes || attendanceRes.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No attendance record found for given date",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Attendance records found",
      attendanceRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to find attendance record",
      error: error.message,
    });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updateRes = await AttendanceModel.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" },
    );

    if (!updateRes) {
      return res
        .status(404)
        .json({ status: false, message: "Attendance record not found" });
    }

    return res.status(200).json({
      status: true,
      message: "Attendance has been updated successfully",
      updateRes,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to update attendance",
      error: error.message,
    });
  }
};

module.exports = {
  updateAttendance,
  fetchAttByDate,
};
