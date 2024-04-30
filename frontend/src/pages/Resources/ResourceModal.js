import React from "react";
import "./ResourceTable.css"; // Add CSS for modal styles

const ResourceModal = ({ resource, onClose }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        {/* Modal header */}
        <div className="modal-header">
          <h2>Resource Details</h2>
          <div className="close-button-container">
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
          </div>
        </div>
        {/* Modal body */}
        <div className="modal-body">
          {/* Display resource details */}
          <p>Number Order: {resource.numberOrder}</p>
          <p>Item ID: {resource.itemId}</p>
          <p>Item Name: {resource.itemName}</p>
          <p>Type: {resource.type}</p>
          <p>Quantity: {resource.quantity}</p>
          <p>Unit Price: {resource.unitPrice}</p>
          <p>Description: {resource.description}</p>
          <p>Alert Quantity: {resource.alertQuantity}</p>
          <p>Supplier: {resource.supplier}</p>
          <p>Supplier Email: {resource.supplierEmail}</p>
          <p>Date Purchased: {resource.datePurchased}</p>
          {/* Add additional resource details here */}
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
