const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected to Atlas");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

module.exports = { dbConnection };
