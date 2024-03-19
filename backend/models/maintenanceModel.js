import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    taskNumber: {
      type: Number,
      required: true, //backend validation...name field must be input to add data to database.
      unique: true,
    },
    task: {
      type: String,
      required: true,
    },
    taskId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    dateAssigned: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("maintenances", maintenanceSchema);
