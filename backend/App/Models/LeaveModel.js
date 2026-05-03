const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    appliedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const LeaveModel = mongoose.model("Leave", Schema);

module.exports = { LeaveModel };
