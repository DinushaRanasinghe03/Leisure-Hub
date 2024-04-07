import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import "./AddResource.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateResource = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // State variables to hold resource data
  const [numberOrder, setNumberOrder] = useState(""); // Added
  const [itemId, setItemId] = useState(""); // Added
  const [itemName, setItemName] = useState(""); // Added
  const [type, setType] = useState(""); // Added
  const [quantity, setQuantity] = useState(""); // Added
  const [unitPrice, setUnitPrice] = useState(""); // Added
  const [description, setDescription] = useState(""); // Added
  const [alertQuantity, setAlertQuantity] = useState(""); // Added
  const [supplier, setSupplier] = useState(""); // Added
  const [supplierEmail, setSupplierEmail] = useState(""); // Added
  const [datePurchased, setDatePurchased] = useState(""); // Added

  //get single resource
  // Fetch single resource data

  const getSingleResource = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8070/api/v1/resources/getResource/${id}`
      );
      if (response.data.success) {
        const resource = response.data.resource;
        setNumberOrder(resource.numberOrder);
        setItemId(resource.itemId);
        setItemName(resource.itemName);
        setType(resource.type);
        setQuantity(resource.quantity);
        setUnitPrice(resource.unitPrice);
        setDescription(resource.description);
        setAlertQuantity(resource.alertQuantity);
        setSupplier(resource.supplier);
        setSupplierEmail(resource.supplierEmail);
        setDatePurchased(resource.datePurchased);
      } else {
        throw new Error(response.data.message || "Failed to fetch resource");
      }
    } catch (error) {
      console.error("Error fetching resource:", error);
      toast.error("Error in getting resources: " + error.message);
    }
  };

  useEffect(() => {
    getSingleResource();
    //eslint-disable-next-line
  }, []);

  // Function to handle form submission
  const handleUpdate = async (e) => {
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

      const { data } = await axios.put(
        `http://localhost:8070/api/v1/resources/updateResource/${id}`,
        resourceData
      );
      if (data?.success) {
        toast.success("Resource updated successfully");
        navigate("/resource");
      } else {
        throw new Error(data?.message || "Failed to update resource");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in updating  resources: " + error.message);
    }
  };
  return (
    <Layout title={"Update Resource - LeisureHub"}>
      <div className="form-container">
        <h2>Update Resource</h2>
        <form onSubmit={handleUpdate} action="#" method="POST">
          <div className="form-group">
            <label htmlFor="itemNo">Number</label>
            <input
              type="text"
              id="itemNo"
              name="itemNo"
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
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              readOnly // Make it read-only
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
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
            <button className="updateResource-button" onClick={handleUpdate}>
              Update Resource
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateResource;
