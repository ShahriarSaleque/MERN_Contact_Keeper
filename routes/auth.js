const express = require("express");
const router = express.Router();

//route     @GET /api/auth
//desc      GET A LOGGED IN USER
//access    PRIVATE
router.get("/", (req, res) => {
  res.send("GET A LOGGED IN USER");
});

//route     @GET /api/auth
//desc      AUTH USER AND GAIN JWT
//access    PRIVATE
router.post("/", (req, res) => {
  res.send("SEND JWT TO AUTH USER");
});

module.exports = router;
