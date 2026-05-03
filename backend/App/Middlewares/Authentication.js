const jwt = require("jsonwebtoken");
require("dotenv").config();
const ensureAuthenticated = async (req, res, next) => {
  try {
    const auth = req.headers["authorization"];
    if (!auth) {
      return res
        .status(403)
        .json({ status: false, message: "Unauthorized, Jwt token required" });
    }
    const decoded = await jwt.verify(auth, process.env.SECRET_ID);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      status: false,
      message: "Unauthorized, Jwt token is wrong or expired",
    });
  }
};

module.exports = { ensureAuthenticated };
