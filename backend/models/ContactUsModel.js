import mongoose from "mongoose";

const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
  },
});

const ContactUs = mongoose.model("ContactUs", ContactSchema);

export default ContactUs;
