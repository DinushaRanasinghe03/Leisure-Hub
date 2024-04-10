import React from 'react';

const MemPaymentSuccessMessage = ({ paymentId }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <div className="alert alert-success" role="alert" style={{ backgroundColor: '#b7e4c7', padding: '20px', borderRadius: '5px', width: '500px', height: '500px', fontSize: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ marginBottom: '40px', color: 'green' }}>Your Membership payment is  Successful.</div>
        <div>Please show your booking summary to the counter at the due date.</div>
      </div>
    </div>
  );
};

export default MemPaymentSuccessMessage;
