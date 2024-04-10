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
                    {paymentDetails.map((payment, index) => (
                        <tr key={index} style={index % 2 === 0 ? rowStyle : {}}>
                            <td style={{ padding: '8px', borderBottom: '1px solid #dee2e6' }}>{payment.name}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #dee2e6' }}>{payment.email}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #dee2e6' }}>{payment.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentSummaryPage;
