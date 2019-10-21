const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

//Bring in the User model
const User = require("../models/User");

//route     @POST /api/users
//desc      USER GETS REGISTERED
//access    PUBLIC
router.post(
  "/",
  [
    check("name", "Name field is required")
      .not()
      .isEmpty(),
    check("email", "Valid email address is required").isEmail(),
    check("password", "Password length must be 6 characters or more").isLength({
      min: 6
    })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("Valid data entered");
  }
);

module.exports = router;
