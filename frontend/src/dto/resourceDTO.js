import * as Yup from "yup";
 
export const schema = Yup.object().shape({
  numberOrder: Yup.string().required("Number is required"),
  itemId: Yup.string()
    .matches(/^[AGT]/, "Item ID must start with A, G, or T")
    .required("Item ID is required"),
  itemName: Yup.string().required("Item Name is required"),
  type: Yup.string().required("Type is required"),
  quantity: Yup.number()
    .min(0, "Quantity must be zero or greater")
    .required("Quantity is required"),
  unitPrice: Yup.number()
    .positive("Unit Price must be positive")
    .required("Unit Price is required"),
  description: Yup.string().required("Description is required"),
  alertQuantity: Yup.number()
    .min(0, "Alert Quantity must be zero or greater")
    .required("Alert Quantity is required"),
  supplier: Yup.string().required("Supplier is required"),
  supplierEmail: Yup.string()
    .email("Invalid email address")
    .required("Supplier Email is required"),
  datePurchased: Yup.date()
    .max(new Date(), "Date Purchased must be in the past")
    .required("Date Purchased is required"),
});