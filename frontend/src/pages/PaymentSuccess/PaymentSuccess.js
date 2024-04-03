import React, { useState } from 'react';

const PaymentSuccessMessage = ({ paymentId }) => {
  return (
    <div className="alert alert-success" role="alert">
      Payment successful! Your payment ID is: {paymentId}
    </div>
  );
};

export default PaymentSuccessMessage;
