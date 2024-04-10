import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PaymentSummaryPage() {
    const [paymentDetails, setPaymentDetails] = useState([]);
    

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/paymentsummaries');
            const response2 = await axios.post('api/paymentsummaries/sum');
            response.data.totalSum = response2;
            setPaymentDetails(response.data);
           
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#f8f9fa', /* Light gray background color */
        border: '1px solid #dee2e6', /* Light gray border */
    };

    const headerCellStyle = {
        backgroundColor: '#007bff', /* Blue background color for header cells */
        color: '#ffffff', /* White text color for header cells */
        padding: '8px',
        borderBottom: '1px solid #dee2e6', /* Light gray bottom border for cells */
    };

    const rowStyle = {
        backgroundColor: '#f2f2f2', /* Light gray background color for even rows */
    };

    const hoverStyle = {
        backgroundColor: '#e2e2e2', /* Darker gray background color on hover */
    };

    const printReport = () => {
        window.print();
    };

    return (
        <div>
        <h1 style={{ textAlign: 'center' }}>Payment Report</h1>
        <table style={tableStyle}>
            <thead>
                <tr>
                    <th style={headerCellStyle}>Name</th>
                    <th style={headerCellStyle}>Email</th>
                    <th style={headerCellStyle}>Total</th>
                </tr>
            </thead>
            <tbody>
                {paymentDetails.map((payment, index) => {
                    // Convert the total to a number, or default to 0 if it's not a valid number
                    const total = parseFloat(payment.total) || 0;
    
                    return (
                        <tr key={index} style={index % 2 === 0 ? rowStyle : {}}>
                            <td style={{ padding: '8px', borderBottom: '1px solid #dee2e6' }}>{payment.name}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #dee2e6' }}>{payment.email}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #dee2e6' }}>{total}</td>
                        </tr>
                    );
                })}
                <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid #dee2e6' }}>Total</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #dee2e6' }}></td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #dee2e6' }}>
                        {paymentDetails.reduce((acc, curr) => acc + (parseFloat(curr.total) || 0), 0)}
                    </td>
                </tr>
            </tbody>
        </table>
       <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={printReport}>Print PDF</button>
            </div>
    </div>
    );
}

export default PaymentSummaryPage;
//psummary
