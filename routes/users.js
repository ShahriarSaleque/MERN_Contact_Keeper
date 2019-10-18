const express = require("express");
const router = express.Router();

//route     @POST /api/users
//desc      USER GETS REGISTERED
//access    PUBLIC
router.post("/", (req, res) => {
  res.send("USER WILL GET REGISTERED THROUGH HERE");
});

module.exports = router;
