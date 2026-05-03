const { LeaveModel } = require("../../Models/LeaveModel");

const empLeaveDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const leaveRes = await LeaveModel.find({ employee: id });
    if (!leaveRes || leaveRes === 0) {
      return res
        .status(400)
        .json({ status: false, message: "No leaves record found" });
    }
    return res
      .status(200)
      .json({ status: true, message: "leave record found", leaveRes });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Unable to find leave record" });
  }
};

const insertEmpLeave = async (req, res) => {
  try {
    const { id } = req.user;
    const { startDate, endDate, reason } = req.body;
    const newStart = new Date(startDate);
    const newEnd = new Date(endDate);
    const existing = await LeaveModel.findOne({
      employee: id,
      startDate: { $lte: newEnd },
      endDate: { $gte: newStart },
    });
    if (existing) {
      return res.status(403).json({
        status: false,
        message: "you already have leave for this period",
      });
    }

    const leaveRes = new LeaveModel({
      employee: id,
      startDate: newStart,
      endDate: newEnd,
      reason,
    });

    const savedLeave = await leaveRes.save();

    return res
      .status(201)
      .json({
        status: true,
        message: "Leave applied successfully",
        savedLeave,
      });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to apply leave at the moment",
      error: error.message,
    });
  }
};
module.exports = { empLeaveDetails, insertEmpLeave };
