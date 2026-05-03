const { LeaveModel } = require("../Models/LeaveModel");

const fetchLeaves = async (req, res) => {
  try {
    const leaveRes = await LeaveModel.find().populate("employee");
    if (!leaveRes || leaveRes.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "no leave data found" });
    }
    return res
      .status(200)
      .json({ status: true, message: "leaves data found", leaveRes });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const insertLeaves = async (req, res) => {
  try {
    const { id } = req.user;
    const { startDate, endDate, reason } = req.body;
    const newStart = new Date(startDate);
    const newEnd = new Date(endDate);

    const existing = await LeaveModel.findOne({
      employee: id,
      status: { $in: ["pending", "approved"] },
      startDate: { $lte: newEnd },
      endDate: { $gte: newStart },
    });

    if (existing) {
      return res.status(400).json({
        status: false,
        message: "You already have a leave in this period",
      });
    }

    const leaveRes = new LeaveModel({
      employee,
      startDate: newStart,
      endDate: newEnd,
      reason,
    });

    const savedLeave = await leaveRes.save();

    return res.status(201).json({
      status: true,
      message: "Leave applied successfully",
      savedLeave,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error applying leave",
      error: error.message,
    });
  }
};

const updateLeaves = async (req, res) => {
  try {
    const { id } = req.query;
    const { status } = req.body;
    const updateRes = await LeaveModel.findByIdAndUpdate(id, { status });
    if (!updateRes) {
      return res
        .status(404)
        .json({ status: false, message: "leave record not found" });
    }
    return res.status(200).json({
      status: true,
      message: "Leave has been marked successfully",
      updateRes,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Unable to mark leave" });
  }
};

module.exports = { fetchLeaves, insertLeaves, updateLeaves };
