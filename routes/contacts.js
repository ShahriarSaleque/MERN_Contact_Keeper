const express = require("express");
const router = express.Router();

//route     @GET /api/contacts
//desc      GET ALL THE USERS CONTACTS
//access    PUBLIC
router.get("/", (req, res) => {
  res.send("GET ALL USERS CONTACTS ");
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
