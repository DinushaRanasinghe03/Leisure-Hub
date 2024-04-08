import React, { useState } from "react";
import Layout from "../../components/layout/LayoutAdmin";
import "./AddResource.css";
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

  //create product function
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
      <div className="form-container">
        <h2>Add New Resource</h2>
        <form onSubmit={handleCreate} action="#" method="POST">
          <div className="form-group">
            <label htmlFor="itemNo">Number</label>
            <input
              type="text"
              id="itemNo"
              name="itemNo"
              placeholder="01"
              value={numberOrder}
              onChange={(e) => setNumberOrder(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemId">Item ID</label>
            <input
              type="text"
              id="itemId"
              name="itemId"
              placeholder="T001"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              placeholder="Enter Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
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

          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="unitPrice">Unit Price</label>
            <input
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

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="2"
              cols="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="alertQuantity">Alert Quantity</label>
            <input
              type="number"
              id="alertQuantity"
              name="alertQuantity"
              value={alertQuantity}
              onChange={(e) => setAlertQuantity(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="supplier">Supplier</label>
            <input
              type="text"
              id="supplier"
              name="supplier"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="supplierEmail">Supplier Email</label>
            <input
              type="text"
              id="supplierEmail"
              name="supplierEmail"
              value={supplierEmail}
              onChange={(e) => setSupplierEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="datePurchased">Date Purchased</label>
            <input
              type="date"
              id="datePurchased"
              name="datePurchased"
              value={datePurchased}
              onChange={(e) => setDatePurchased(e.target.value)}
              required
            />
          </div>

          <div>
            <button className="addResource-button" onClick={handleCreate}>
              Add Resource
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddResource;
