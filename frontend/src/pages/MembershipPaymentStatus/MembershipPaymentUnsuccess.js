import React from 'react';

const MemPaymentUnSuccessMessage = ({ paymentId }) => {

  // Function to handle retry button click
  const handleRetry = () => {
    // Redirect the user to the payment page
    window.location.href = '/membership';
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <div className="alert alert-success" role="alert" style={{ backgroundColor: '#b7e4c7', padding: '20px', borderRadius: '5px', width: '500px', height: '500px', fontSize: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ marginBottom: '40px', color: 'red' }}>Movie Ticket Reservation Unsuccessful.</div>
        <div>Try again</div>
        {/* Retry button with onClick event */}
        <button onClick={handleRetry} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '18px', borderRadius: '5px', backgroundColor: '#007bff', color: '#ffffff', border: 'none' }}>Retry</button>
      </div>
    </div>
  );
};

export default MemPaymentUnSuccessMessage;

//MemPaymentUnSuccessMessage