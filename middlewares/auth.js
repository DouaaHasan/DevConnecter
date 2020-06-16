const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("jwtSecret");

module.exports = function (req, res, next) {
  //Get the token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied." });
  }
  //   Verify token
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid." });
  }
};
