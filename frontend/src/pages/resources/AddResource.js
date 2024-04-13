import React, { useState } from "react";
import Layout from "../../components/Layout/LayoutAdmin";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        "http://localhost:8070/api/v1/resources/createResource",
        resourceData
      );
      console.log()
      if (data?.success) {
        toast.success("Resource Created successfully");
        navigate("/resource");
      } else {
        throw new Error(data?.message || "Failed to fetch resources");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting resources: " + error.message);
    }
  };

  return (
    <Layout title={"Add Resource - LeisureHub"}>
      <div style={{ width: "30%", marginTop: "20px", padding: "20px", marginLeft: "500px", backgroundColor: "#ffffff", borderRadius: "20px", boxShadow: "50px 50px 50px 50px #00000018", marginBottom: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add New Resource</h2>
        <form onSubmit={handleCreate} action="#" method="POST">
          <div style={{ marginBottom: "15px", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <label style={{ display: "inline-block", width: "130px", fontWeight: "bold" }} htmlFor="itemNo">Number</label>
            <input
              style={{ flex: 1, padding: "5px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box", fontSize: "12px" }}
              type="text"
              id="itemNo"
              name="itemNo"
              placeholder="01"
              value={numberOrder}
              onChange={(e) => setNumberOrder(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "15px", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <label style={{ display: "inline-block", width: "130px", fontWeight: "bold" }} htmlFor="itemId">Item ID</label>
            <input
              style={{ flex: 1, padding: "5px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box", fontSize: "12px" }}
              type="text"
              id="itemId"
              name="itemId"
              placeholder="T001"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "15px", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <label style={{ display: "inline-block", width: "130px", fontWeight: "bold" }} htmlFor="itemName">Item Name</label>
            <input
              style={{ flex: 1, padding: "5px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box", fontSize: "12px" }}
              type="text"
              id="itemName"
              name="itemName"
              placeholder="Enter Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "15px", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <label style={{ display: "inline-block", width: "130px", fontWeight: "bold" }} htmlFor="type">Type</label>
            <select
              style={{ flex: 1, padding: "5px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box", fontSize: "12px" }}
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="Theater">Theater</option>
              <option value="Games">Games</option>
              <option value="Activities">Activities</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <label style={{ display: "inline-block", width: "130px", fontWeight: "bold" }} htmlFor="quantity">Quantity</label>
            <input
              style={{ flex: 1, padding: "5px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box", fontSize: "12px" }}
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "15px", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <label style={{ display: "inline-block", width: "130px", fontWeight: "bold" }} htmlFor="unitPrice">Unit Price</label>
            <input
              style={{ flex: 1, padding: "5px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box", fontSize: "12px" }}
              type="number"
              id="unitPrice"
              name="unitPrice"
              step="0.01"
              placeholder="200"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "15px", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <label style={{ display: "inline-block", width: "130px", fontWeight: "bold" }} htmlFor="description">Description</label>
            <textarea
              style={{ flex: 1, padding: "5px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box", fontSize: "12px" }}
              id="description"
              name="description"
              rows="2"
              cols="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "15px", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <label style={{ display: "inline-block", width: "130px", fontWeight: "bold" }} htmlFor="alertQuantity">Alert Quantity</label>
            <input
              style={{ flex: 1, padding: "5px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box", fontSize: "12px" }}
              type="number"
              id="alertQuantity"
              name="alertQuantity"
              value={alertQuantity}
              onChange={(e) => setAlertQuantity(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "15px", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <label style={{ display: "inline-block", width: "130px", fontWeight: "bold" }} htmlFor="supplier">Supplier</label>
            <input
              style={{ flex: 1, padding: "5px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box", fontSize: "12px" }}
              type="text"
              id="supplier"
              name="supplier"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "15px", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <label style={{ display: "inline-block", width: "130px", fontWeight: "bold" }} htmlFor="supplierEmail">Supplier Email</label>
            <input
              style={{ flex: 1, padding: "5px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box", fontSize: "12px" }}
              type="text"
              id="supplierEmail"
              name="supplierEmail"
              value={supplierEmail}
              onChange={(e) => setSupplierEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "15px", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <label style={{ display: "inline-block", width: "130px", fontWeight: "bold" }} htmlFor="datePurchased">Date Purchased</label>
            <input
              style={{ flex: 1, padding: "5px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box", fontSize: "12px" }}
              type="date"
              id="datePurchased"
              name="datePurchased"
              value={datePurchased}
              onChange={(e) => setDatePurchased(e.target.value)}
              required
            />
          </div>

          <div>
            <button style={{ backgroundColor: "#4caf50", color: "white", padding: "10px 20px", fontSize: "16px", border: "none", borderRadius: "5px", cursor: "pointer", margin: "30px" }} onClick={handleCreate}>
              Add Resource
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddResource;
