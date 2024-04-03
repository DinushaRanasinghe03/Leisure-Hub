const mongoose = require("mongoose"); //kalin wage mongoos add karanna

const Schema = mongoose.Schema; //schema set karanna

const RateSchema = new Schema({
  filmname: {
    type: String, //type
    required: true, //validate
  },
  name: {
    type: String, //type
    required: true, //validate
  },
  gmail: {
    type: String, //type
    required: true, //validate
  },
  ratestar: {
    type: String, //type
    required: true, //validate
  },
  comment: {
    type: String, //type
    required: true, //validate
  },
});

module.exports = mongoose.model("Rate", RateSchema); //schema eka send karanna
