const express = require("express");
const router = express.Router();
//Insert Model
const Contact = require("../Model/ContactUsModel");

//Insert User Controller
const ContactController = require("../Controllers/ContactUsControllers");

router.get("/", ContactController.getAllContact);
router.post("/", ContactController.addContact);
router.get("/:id", ContactController.getById);
router.put("/:id", ContactController.updateContact);
router.delete("/:id", ContactController.deleteContact);

//export
module.exports = router;
