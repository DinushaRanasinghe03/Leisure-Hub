import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LayoutAdmin from "../components/Layout/LayoutAdmin";
 
const AddResource = () => {
  const navigate = useNavigate();
  const [numberOrder, setNumberOrder] = useState("");
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [description, setDescription] = useState("");
  const [alertQuantity, setAlertQuantity] = useState("");
  const [supplier, setSupplier] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [datePurchased, setDatePurchased] = useState("");
 
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const resourceData = new FormData();
      resourceData.append("numberOrder", numberOrder);
      resourceData.append("itemId", itemId);
      resourceData.append("itemName", itemName);
      resourceData.append("type", type);
      resourceData.append("quantity", quantity);
      resourceData.append("unitPrice", unitPrice);
      resourceData.append("description", description);
      resourceData.append("alertQuantity", alertQuantity);
      resourceData.append("supplier", supplier);
      resourceData.append("unitPrice", unitPrice);
      resourceData.append("supplierEmail", supplierEmail);
      resourceData.append("datePurchased", datePurchased);
 
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/resources/createResource",
        resourceData
      );
 
      if (data?.success) {
        toast.success("Resource Created successfully");
        navigate("/resource");
      } else {
        throw new Error(data?.message || "Failed to fetch resources");
      }
    } catch (error) {
      toast.error("Error in getting resources: " + error.message);
    }
  };
 
  return (
    <LayoutAdmin><br/><br/><br/><br/>
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
<div style={{ width: "400px", padding: "20px", border: "1px solid #ccc", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>

<form onSubmit={handleCreate}>

<div style={{ marginBottom: "10px" }}>
<h2 style={{ marginBottom: "20px", textAlign: "center" }}>Add New Resource</h2>
<label htmlFor="itemNo" style={{ display: "block" }}>Number</label>
<input
              type="text"
              id="itemNo"
              name="itemNo"
              placeholder="01"
              value={numberOrder}
              onChange={(e) => setNumberOrder(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div style={{ marginBottom: "10px" }}>
<label htmlFor="itemId" style={{ display: "block" }}>Item ID</label>
<input
              type="text"
              id="itemId"
              name="itemId"
              placeholder="T001"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div style={{ marginBottom: "10px" }}>
<label htmlFor="itemName" style={{ display: "block" }}>Item Name</label>
<input
              type="text"
              id="itemName"
              name="itemName"
              placeholder="Enter Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div style={{ marginBottom: "10px" }}>
<label htmlFor="type" style={{ display: "block" }}>Type</label>
<select
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
>
<option value="">Select Type</option>
<option value="Theater">Theater</option>
<option value="Games">Games</option>
<option value="Activities">Activities</option>
</select>
</div>
 
          <div style={{ marginBottom: "10px" }}>
<label htmlFor="quantity" style={{ display: "block" }}>Quantity</label>
<input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div style={{ marginBottom: "10px" }}>
<label htmlFor="unitPrice" style={{ display: "block" }}>Unit Price</label>
<input
              type="number"
              id="unitPrice"
              name="unitPrice"
              step="0.01"
              placeholder="200"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div style={{ marginBottom: "10px" }}>
<label htmlFor="description" style={{ display: "block" }}>Description</label>
<textarea
              id="description"
              name="description"
              rows="2"
              cols="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div style={{ marginBottom: "10px" }}>
<label htmlFor="alertQuantity" style={{ display: "block" }}>Alert Quantity</label>
<input
              type="number"
              id="alertQuantity"
              name="alertQuantity"
              value={alertQuantity}
              onChange={(e) => setAlertQuantity(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div style={{ marginBottom: "10px" }}>
<label htmlFor="supplier" style={{ display: "block" }}>Supplier</label>
<input
              type="text"
              id="supplier"
              name="supplier"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div style={{ marginBottom: "10px" }}>
<label htmlFor="supplierEmail" style={{ display: "block" }}>Supplier Email</label>
<input
              type="text"
              id="supplierEmail"
              name="supplierEmail"
              value={supplierEmail}
              onChange={(e) => setSupplierEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div style={{ marginBottom: "10px" }}>
<label htmlFor="datePurchased" style={{ display: "block" }}>Date Purchased</label>
<input
              type="date"
              id="datePurchased"
              name="datePurchased"
              value={datePurchased}
              onChange={(e) => setDatePurchased(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div>
<button style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={handleCreate}>
              Add Resource
</button>
</div>
</form>
</div>
</div>
<br/><br/>
</LayoutAdmin>
  );
};
 
export default AddResource;

