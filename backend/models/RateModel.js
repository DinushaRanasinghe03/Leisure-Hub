import mongoose from 'mongoose';

const { Schema } = mongoose;

const RateSchema = new Schema({
  filmname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  ratestar: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Rate = mongoose.model('Rate', RateSchema);

export default Rate;
