const mongoose = require("mongoose"); //kalin wage mongoos add karanna

const Schema = mongoose.Schema; //schema set karanna

const FeedbackSchema = new Schema({
  name: {
    type: String, //type
    required: true,
  },
  gmail: {
    type: String, //type
    required: true,
  },
  category: {
    type: String, //type
    required: true,
  },
  message: {
    type: String, //type
    required: true,
  },
  solution: {
    type: String, //type
    required: true,
  },
});

module.exports = mongoose.model("Feedback", FeedbackSchema); //schema eka send karanna
