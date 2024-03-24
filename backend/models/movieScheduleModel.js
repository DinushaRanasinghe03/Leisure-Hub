import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    movie: {
      type: mongoose.ObjectId,
      ref: "moviename",
      required: true,
    },
    unavailable_seats: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("movieschedule", scheduleSchema);
