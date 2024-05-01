import React from "react";


const ResourceModal = ({ resource, onClose }) => {
  return (
    <div
  className="modal-container"
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}
>
<div
    className="modal-content"
    style={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"
    }}
>
    {/* Modal header */}
<div
      className="modal-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px"
      }}
>
<h2 style={{ fontWeight: "bold" }}>Resource Details</h2>
<div
        className="close-button-container"
        style={{
          backgroundColor: "rgb(199, 196, 196)",
          padding: "5px",
          borderRadius: "5px"
        }}
>
<button
          className="close-button"
          onClick={onClose}
          style={{
            background: "none",
            border: "2px solid black",
            cursor: "pointer",
            fontSize: "50px",
            width: "20px",
            height: "15px",
            color: "rgb(3, 3, 3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
>
&times;
</button>
</div>
</div>
    {/* Modal body */}
<div
      className="modal-body"
      style={{
        marginBottom: "5px"
      }}
>
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