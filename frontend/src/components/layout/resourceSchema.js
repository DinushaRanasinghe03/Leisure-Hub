import * as Yup from "yup";

// Define a reusable Yup schema
const resourceSchema = Yup.object().shape({
  numberOrder: Yup.number().required("Number Order is Required"),
  itemId: Yup.string()
    .required("Item ID is Required")
    .matches(/^(A|G|T)/, "Item ID must start with A, G, or T"),
  itemName: Yup.string().required("Item Name is Required"),
  type: Yup.string().required("Type is Required"),
  quantity: Yup.number().required("Quantity is Required"),
  unitPrice: Yup.number().required("Unit Price is Required"),
  description: Yup.string().required("Description is Required"),
  alertQuantity: Yup.number().required("Alert Quantity is Required"),
  supplier: Yup.string().required("Supplier is Required"),
  supplierEmail: Yup.string()
    .email("Invalid email")
    .required("Supplier Email is Required"),
  datePurchased: Yup.date().required("Date Purchased is Required"),
});

export { resourceSchema };