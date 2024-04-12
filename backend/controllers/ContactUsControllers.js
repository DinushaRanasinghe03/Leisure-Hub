import ContactUs from "../models/ContactUsModel.js";

export const getAllContact = async (req, res, next) => {
  try {
    const contacts = await ContactUs.find();
    if (contacts.length === 0) {
      return res.status(404).json({ message: "ContactUs not found" });
    }
    return res.status(200).json({ contacts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addContact = async (req, res, next) => {
  const { name, gmail, phone, message, reply } = req.body;
  try {
    const contact = new ContactUs({ name, gmail, phone, message, reply });
    const savedContact = await contact.save(); // Saving the contact and capturing the saved instance
    return res.status(200).json({ contact: savedContact }); // Returning the saved contact in the response
  } catch (err) {
    console.error('Error in addContact:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const contact = await ContactUs.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json({ contact });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateContact = async (req, res, next) => {
  const id = req.params.id;
  const { name, gmail, phone, message, reply } = req.body;
  try {
    let contact = await ContactUs.findByIdAndUpdate(
      id,
      { name, gmail, phone, message, reply },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json({ contact });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteContact = async (req, res, next) => {
  const id = req.params.id;
  try {
    const contact = await ContactUs.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json({ contact });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default{ getAllContact, addContact, getById, updateContact, deleteContact };
