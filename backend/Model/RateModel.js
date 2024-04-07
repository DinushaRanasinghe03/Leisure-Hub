const mongoose = require("mongoose"); //kalin wage mongoos add karanna

const Schema = mongoose.Schema; //schema set karanna

const RateSchema = new Schema({
  filmname: {
    type: String, //type
    required: true,
  },
  name: {
    type: String, //type
    required: true,
  },
  gmail: {
    type: String, //type
    required: true,
  },
  ratestar: {
    type: String, //type
    required: true,
  },
  comment: {
    type: String, //type
    required: true,
  },
});

module.exports = mongoose.model("Rate", RateSchema); //schema eka send karanna
