const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check to see if the user already exists
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists " });
      } else {
        //Create a User instance
        user = new User({
          name: name,
          email: email,
          password: password
        });
        //Hash the password and save again
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;

        //Insert instance to DB
        await user.save();
        return res.status(200).json({ msg: "User entered to database" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
