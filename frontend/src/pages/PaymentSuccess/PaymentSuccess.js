import React, { useState } from 'react';

const PaymentUnSuccessMessage = ({ paymentId }) => {
  return (
    <div className="alert alert-success" role="alert">
      Movie Ticket Reservation Unsuccessful! Try Again
    </div>
    
  );
};

export default PaymentUnSuccessMessage;
