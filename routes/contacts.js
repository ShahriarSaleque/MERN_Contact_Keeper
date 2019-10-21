const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

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
//access    PRIVATE
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name field is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: "Invalid Contact credentials" });
    } else {
      //Make a contact and add to Schema
      const { name, email, phone, type } = req.body;
      // console.log(req.body);
      try {
        const newContact = new Contact({
          name,
          email,
          phone,
          type,
          user: req.user.id
        });
        //Insert instance into DB
        const contact = await newContact.save();

        return res.json(contact);
      } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
      }
    }
  }
);

//route     @PUT /api/contacts/:id
//desc      UPDATE A USER CONTACT
//access    PRIVATE
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return res.status(400).json({ msg: "Contact not found" });
  } else {
    let contactObject = {};
    if (name) contactObject.name = name;
    if (email) contactObject.email = email;
    if (phone) contactObject.phone = phone;
    if (type) contactObject.type = type;

    //Check to see if contact is specific to the user
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorized");
    } else {
      try {
        //Update contact entry in DB
        await Contact.findByIdAndUpdate(
          req.params.id,
          { $set: contactObject },
          { new: true }
        );
        return res.json(contact);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
      }
    }
  }
});

//route     @DELETE /api/contacts/:id
//desc      DELATE A CONTACT
//access    PRIVATE
router.delete("/:id", (req, res) => {
  res.send("DELATE A CONTACT");
});

module.exports = router;
