import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import AdminStaffMenu from '../../components/Layout/AdminStaffMenu';
import jsPDF from 'jspdf';

function EmployeeSalaryList() {
  const [employeeSalaries, setEmployeeSalaries] = useState([]);

  useEffect(() => {
    fetchEmployeeSalaryData();
  }, []);

  const fetchEmployeeSalaryData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/EmployeeSalary/getAllEmployeeSalary');
      if (response.ok) {
        const data = await response.json();
        setEmployeeSalaries(data);
      } else {
        console.error('Failed to fetch employee salary data');
      }
    } catch (error) {
      console.error('Error fetching employee salary data:', error);
    }
  };

  const handleUpdate = (employeeSalaryId) => {
    // Implement update functionality here
    console.log(`Updating employee salary with ID: ${employeeSalaryId}`);
  };

  const handleDelete = async (employeeSalaryId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/EmployeeSalary/deleteEmployeeSalary/${employeeSalaryId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Employee salary removed successfully');
        // Remove the deleted employee salary from the state
        setEmployeeSalaries(employeeSalaries.filter(employeeSalary => employeeSalary._id!== employeeSalaryId));
      } else {
        console.error('Failed to delete employee salary');
      }
    } catch (error) {
      console.error('Error deleting employee salary:', error);
    }
  };

  // Format a date string to remove the time zone
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const generatePDF = () => {
    // Calculate total salary sum
    const totalSalSum = employeeSalaries.reduce((acc, employeeSalary) => acc + employeeSalary.totalSal, 0);
    
    // Calculate total otHours sum
    const otHoursSum = employeeSalaries.reduce((acc, employeeSalary) => acc + employeeSalary.otHours, 0);
  
    // Calculate total bonus sum
    const bonusSum = employeeSalaries.reduce((acc, employeeSalary) => acc + employeeSalary.bonus, 0);
  
    // Create a new PDF document
    const pdf = new jsPDF();
  
    // Set up document formatting
    const pdfWidth = pdf.internal.pageSize.getWidth();
    pdf.setFontSize(18);
    pdf.setTextColor(40);
    const title = "Employee Salary Report";
    const titleWidth = pdf.getStringUnitWidth(title) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    pdf.text(title, (pdfWidth - titleWidth) / 2, 20);
    pdf.setFontSize(14);
    pdf.setTextColor(0);
    const totalSumText = `Total Salary: ${totalSalSum}`;
    const otHoursSumText = `Total OT Hours: ${otHoursSum}`;
    const bonusSumText = `Total Bonus: ${bonusSum}`;
    const totalSumWidth = pdf.getStringUnitWidth(totalSumText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const otHoursSumWidth = pdf.getStringUnitWidth(otHoursSumText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const bonusSumWidth = pdf.getStringUnitWidth(bonusSumText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    pdf.text(totalSumText, (pdfWidth - totalSumWidth) / 2, 40);
    pdf.text(otHoursSumText, (pdfWidth - otHoursSumWidth) / 2, 50);
    pdf.text(bonusSumText, (pdfWidth - bonusSumWidth) / 2, 60);
  
    // Save the PDF
    pdf.save('employee_salary_report.pdf');
  };

  return (

    <div className="container-fluid m-3 p-3">
    <div className="row">
      <div className="col-md-3">
        <AdminStaffMenu />
      </div>

    <div>
      <h2>Employee Salary List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee NIC</th>
            <th>Month</th>
            <th>Basic Salary</th>
            <th>OT Hours</th>
            <th>OT Rate</th>
            <th>OT Total</th>
            <th>Bonus</th>
            <th>Total Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeSalaries.map(employeeSalary => (
            <tr key={employeeSalary._id}>
              <td>{employeeSalary.NIC}</td>
              <td>{formatDate(employeeSalary.month)}</td>
              <td>{employeeSalary.basicSal}</td>
              <td>{employeeSalary.otHours}</td>
              <td>{employeeSalary.otRate}</td>
              <td>{employeeSalary.otTotal}</td>
              <td>{employeeSalary.bonus}</td>
              <td>{employeeSalary.totalSal}</td>
              <td>
              <a href={'/updateEmployeeSalary/' + employeeSalary._id}>
          <button variant="primary">Update</button>
          </a>
                {/* <Button variant="danger" onClick={() => handleDelete(employeeSalary._id)}>Delete</Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={generatePDF}>Download PDF</Button>
    </div>
    </div>
    </div>
  );
}

export default EmployeeSalaryList;