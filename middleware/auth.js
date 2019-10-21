const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  //Get the token
  const token = req.header("x-auth-token");
  try {
    if (!token) {
      return res.status(401).json({ msg: "Invalid Token" });
    } else {
      //Verify the token
      const decode = jwt.verify(token, config.get("jwtSecret"));
      req.user = decode.user;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Invalid User credentials" });
  }
};
