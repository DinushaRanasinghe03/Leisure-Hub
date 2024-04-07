const ContactUs = require("../Model/ContactUsModel");

const getAllContact = async (req, res, next) => {
  let contact;
  // Get all contact
  try {
    contact = await ContactUs.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!contact) {
    return res.status(404).json({ message: "ContactUs not found" });
  }
  // Display all contact
  return res.status(200).json({ contact });
};

// data Insert
const addContact = async (req, res, next) => {
  const { name, gmail, phone, message,reply } = req.body;

  let contact;

  try {
    contact = new ContactUs({ name, gmail, phone, message,reply });
    await contact.save();
  } catch (err) {
    console.log(err);
  }
  // not insert contacts
  if (!contact) {
    return res.status(404).json({ message: "unable to add contacts" });
  }
  return res.status(200).json({ contact });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let contact;

  try {
    contact = await ContactUs.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available contacts
  if (!contact) {
    return res.status(404).json({ message: "contact Not Found" });
  }
  return res.status(200).json({ contact });
};

//Update contact Details
const updateContact = async (req, res, next) => {
  const id = req.params.id;
  const { name, gmail, phone, message,reply } = req.body;

  let contacts;

  try {
    contacts = await ContactUs.findByIdAndUpdate(id, {
      name: name,
      gmail: gmail,
      phone: phone,
      message: message,
      reply: reply
    });
    contacts = await contacts.save();
  } catch (err) {
    console.log(err);
  }
  if (!contacts) {
    return res.status(404).json({ message: "Unable to Update contact Details" });
  }
  return res.status(200).json({ contacts });
};

//Delete contact Details
const deleteContact = async (req, res, next) => {
  const id = req.params.id;

  let contact;

  try{
    contact= await ContactUs.findByIdAndDelete(id)
  }catch (err) {
    console.log(err);
  }
  if (!contact) {
    return res.status(404).json({ message: "Unable to Delete contact Details" });
  }
  return res.status(200).json({ contact });

};

exports.getAllContact = getAllContact;
exports.addContact = addContact;
exports.getById = getById;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;
