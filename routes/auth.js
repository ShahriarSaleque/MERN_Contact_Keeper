const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

//Bring in the User model
const User = require("../models/User");

//route     @GET /api/auth
//desc      AUTH USER AND SEND JWT
//access    PRIVATE
router.get("/", auth, async (req, res) => {
  try {
    //Get user info from token
    const user = await User.findById(req.user.id).select("-password");
    console.log(user);
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//route     @GET /api/auth
//desc      GET A LOGGED IN USER
//access    PRIVATE
router.post(
  "/",
  [
    check("email", "Valid email required").isEmail(),
    check("password", "Password required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: "Invalid Credentials " });
    } else {
      const { email, password } = req.body;
      //Check to see if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
      } else {
        //Check the password
        try {
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials " });
          } else {
            //sign and return a JWT
            const payload = {
              user: {
                id: user.id
              }
            };
            jwt.sign(
              payload,
              config.get("jwtSecret"),
              {
                expiresIn: 3600
              },
              (err, token) => {
                if (err) throw err;
                else {
                  res.json({ token });
                }
              }
            );
          }
        } catch (error) {
          console.error(error);
          return res.send(500).send("Internal Server Error");
        }
      }
    }
    res.json({ token });
  }
);

module.exports = router;
