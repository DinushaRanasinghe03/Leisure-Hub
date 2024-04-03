const mongoose = require("mongoose"); //kalin wage mongoos add karanna

const Schema = mongoose.Schema; //schema set karanna

const ContactSchema = new Schema({
  name: {
    type: String,//type
    required: true,//validate
  },
  gmail: {
    type: String,//type
    required: true,
  },
  phone: {
    type: String,//type
    required: true,
  },
  message: {
    type: String,//type
    required: true,
  },
  reply: {
    type: String,
  },
});

module.exports = mongoose.model("ContactUs", ContactSchema); //schema eka send karanna
