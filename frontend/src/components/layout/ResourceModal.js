import React from "react";
import "./ResourceTable.css"; // Add CSS for modal styles

const ResourceModal = ({ resource, onClose }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        {/* Modal header */}
        <div className="modal-header">
          <h2>Resource Details</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        {/* Modal body */}
        <div className="modal-body">
          {/* Display resource details */}
          <p>Number Order: {resource.numberOrder}</p>
          <p>Item ID: {resource.itemId}</p>
          {/* Display other resource details */}
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
