var jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.validateToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw new Error("Invalid token.");
    }

    const decoded = jwt.verify(token, process.env.secret_key);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};
