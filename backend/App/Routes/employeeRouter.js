const express = require("express");
const employeeRouter = express.Router();

employeeRouter.get("/employee");

module.exports = { employeeRouter };
