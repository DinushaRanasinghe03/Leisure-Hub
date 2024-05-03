import React from "react";

const ResourceModal = ({ resource, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {/* Modal header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold">Resource Details</h2>
          <div className="bg-gray-300 rounded-full h-8 w-8 flex justify-center items-center">
            <button className="text-black text-3xl" onClick={onClose}>
              &times;
            </button>
          </div>
        </div>
        {/* Modal body */}
        <div className="space-y-2">
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
