const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

//Bring in all the Schemas
const User = require("../models/User");
const Contact = require("../models/Contact");

//route     @GET /api/contacts
//desc      GET ALL THE USERS CONTACTS
//access    PRIVATE
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    return res.json(contacts);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Resource is not found" });
  }
});

//route     @POST /api/contacts
//desc      INSERT A USER CONTACT
//access    PUBLIC
router.post("/", (req, res) => {
  res.send("ENTER A CONTACT ");
});

//route     @PUT /api/contacts/:id
//desc      UPDATE A USER CONTACT
//access    PUBLIC
router.put("/:id", (req, res) => {
  res.send("UPDATE A USER CONTACT");
});

//route     @DELETE /api/contacts/:id
//desc      DELATE A CONTACT
//access    PUBLIC
router.delete("/:id", (req, res) => {
  res.send("DELATE A CONTACT");
});

module.exports = router;
