import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/LayoutAdmin";
import "./AddResource.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateResource = (resourceId, onUpdate, onCancel) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [resource, setResource] = useState({
    numberOrder: "",
    itemId: "",
    itemName: "",
    type: "",
    quantity: "",
    unitPrice: "",
    description: "",
    alertQuantity: "",
    supplier: "",
    supplierEmail: "",
    datePurchased: "",
  });

  const getSingleResource = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8070/api/v1/resources/getResource/${id}`
      );
      if (data.success) {
        console.log(data);
        setResource(data.resources);
      } else {
        throw new Error(data.message || "Failed to fetch resource");
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8070/api/v1/resources/updateResource/${id}`,
        resource
      );
      if (response.data.success) {
        toast.success("Resource updated successfully");
        onUpdate(response.data.resources);
        navigate("/resource"); // Redirect after successful update
      } else {
        console.error("Update response:", response.data);
        throw new Error(response.data.message || "Failed to update resource");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error in updating resources: " + error.message);
    }
  };

  const handleChange = (e) => {
    setResource({
      ...resource,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout title={"Update Resource - LeisureHub"}>
      <div className="form-container">
        <h2>Update Resource</h2>
        <form onSubmit={handleUpdate} action="#" method="POST">
          <div className="form-group">
            <label htmlFor="numberOrder">Number Order</label>
            <input
              type="text"
              id="numberOrder"
              name="numberOrder"
              value={resource.numberOrder}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemId">Item ID</label>
            <input
              type="text"
              id="itemId"
              name="itemId"
              value={resource.itemId}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={resource.itemName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={resource.type}
              onChange={handleChange}
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
              value={resource.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="unitPrice">Unit Price</label>
            <input
              type="number"
              id="unitPrice"
              name="unitPrice"
              step="0.01"
              value={resource.unitPrice}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="2"
              cols="50"
              value={resource.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="alertQuantity">Alert Quantity</label>
            <input
              type="number"
              id="alertQuantity"
              name="alertQuantity"
              value={resource.alertQuantity}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="supplier">Supplier</label>
            <input
              type="text"
              id="supplier"
              name="supplier"
              value={resource.supplier}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="supplierEmail">Supplier Email</label>
            <input
              type="text"
              id="supplierEmail"
              name="supplierEmail"
              value={resource.supplierEmail}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="datePurchased">Date Purchased</label>
            <input
              type="date"
              id="datePurchased"
              name="datePurchased"
              value={resource.datePurchased}
              onChange={handleChange}
            />
          </div>
          <button
            className="updateResource-button"
            onClick={handleUpdate}
            type="submit"
          >
            Update Resource
          </button>

          <button onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateResource;
