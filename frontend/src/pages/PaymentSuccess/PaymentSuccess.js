import React from 'react';

const PaymentUnSuccessMessage = ({ paymentId }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <div className="alert alert-success" role="alert" style={{ backgroundColor: '#f8d7da', padding: '20px', borderRadius: '5px', width: '500px', height: '500px' }}>
        Movie Ticket Reservation Unsuccessful! Try Again
      </div>
    </div>
  );
};

export default PaymentUnSuccessMessage;
