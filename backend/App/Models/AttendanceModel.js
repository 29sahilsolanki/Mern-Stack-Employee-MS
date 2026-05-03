const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    status: {
      type: String,
      enum: ["present", "absent"],
      required: true,
    },
  },
  { timestamps: true },
);

Schema.index({ employee: 1, date: 1 }, { unique: true });

const AttendanceModel = mongoose.model("Attendance", Schema);
module.exports = { AttendanceModel };
