import React from "react";
import Layout from "../../components/Layout/Layout";

const MemPaymentSuccessMessage = ({ paymentId }) => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          className="alert alert-success"
          role="alert"
          style={{
            backgroundColor: "#b7e4c7",
            padding: "20px",
            borderRadius: "5px",
            width: "500px",
            height: "500px",
            fontSize: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* <img src={successImage} alt="Success" style={{ marginBottom: '20px', width: '200px' }} /> Add your image here */}
          <div style={{ marginBottom: "40px", color: "green" }}>
            Your Membership payment is Successful.
          </div>
          <div>Your payment is successful for the month of May</div>
        </div>
      </div>
    </Layout>
  );
};

export default MemPaymentSuccessMessage;
