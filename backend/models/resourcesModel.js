import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    numberOrder: {
      type: Number,
      required: true, //backend validation...name field must be input to add data to database.
      unique: true,
    },
    itemId: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    alertQuantity: {
      type: Number,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    supplierEmail: {
      type: String,
      required: true,
    },
    datePurchased: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("resources", resourceSchema);