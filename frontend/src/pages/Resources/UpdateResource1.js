import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const UpdateResource = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the resource ID from URL params
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/api/v1/resources/getResource/${id}`
        );

        // Populate form data with fetched resource details
        setFormData({
          numberOrder: response.data.resources.numberOrder,
          itemId: response.data.resources.itemId,
          itemName: response.data.resources.itemName,
          type: response.data.resources.type,
          quantity: response.data.resources.quantity,
          unitPrice: response.data.resources.unitPrice,
          description: response.data.resources.description,
          alertQuantity: response.data.resources.alertQuantity,
          supplier: response.data.resources.supplier,
          supplierEmail: response.data.resources.supplierEmail,
          datePurchased: response.data.resources.datePurchased,
        });
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };
    fetchResource();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData); // Log the formData object
    try {
      const { data } = await axios.put(
        `http://localhost:8070/api/v1/resources/updateResource/${id}`,
        formData
      );
      console.log(data); // Log response from the server
      if (data?.success) {
        toast.success("Resource updated successfully"); // Show success message
        navigate("/resource");
      } else {
        throw new Error(data?.message || "Failed to update resource");
      }
    } catch (error) {
      console.error("Error updating resource:", error.response); // Log error
      toast.error("Error updating resource: " + error.message); // Show error message
    }
  };

  return (
    <div>
      <h2>Update Resource</h2>
      <form onSubmit={handleSubmit} action="#" method="PUT">
        <div className="form-group">
          <label htmlFor="numberOrder">Number Order</label>
          <input
            type="text"
            id="numberOrder"
            name="numberOrder"
            value={formData.numberOrder}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemId">Item ID</label>
          <input
            type="text"
            id="itemId"
            name="itemId"
            value={formData.itemId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
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
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="unitPrice">Unit Price</label>
          <input
            type="number"
            id="unitPrice"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="2"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="alertQuantity">Alert Quantity</label>
          <input
            type="number"
            id="alertQuantity"
            name="alertQuantity"
            value={formData.alertQuantity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="supplier">Supplier</label>
          <input
            type="text"
            id="supplier"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="supplierEmail">Supplier Email</label>
          <input
            type="text"
            id="supplierEmail"
            name="supplierEmail"
            value={formData.supplierEmail}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="datePurchased">Date Purchased</label>
          <input
            type="date"
            id="datePurchased"
            name="datePurchased"
            value={formData.datePurchased}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit}>Update Resource </button>
      </form>
    </div>
  );
};

export default UpdateResource;
