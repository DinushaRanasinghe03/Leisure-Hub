import mongoose from "mongoose";

const { Schema, model } = mongoose;

const FeedbackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
});

const Feedback = model("Feedback", FeedbackSchema);

export default Feedback;
