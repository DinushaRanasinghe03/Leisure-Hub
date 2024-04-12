import React, { useState, useEffect } from 'react';
import AdminStaffMenu from '../../components/Layout/AdminStaffMenu';
import jsPDF from 'jspdf';
import LayoutAdmin from './../../components/Layout/LayoutAdmin';

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
    pdf.setFont('times');
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
    <LayoutAdmin><br/><br/>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminStaffMenu />
        </div>
        <div className="col-md-9">
          <div className="text-center">
            <h2>Employee Salary List</h2><br></br>
          </div>
          <table className="table table-striped table-bordered table-hover">
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
                      <button className="btn btn-primary">Update</button>
                    </a>
                    {/* <button className="btn btn-danger" onClick={() => handleDelete(employeeSalary._id)}>Delete</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success" onClick={generatePDF}>Download PDF</button>
        </div>
      </div>
    </div>
    <br/><br/>
    </LayoutAdmin>
  );
}

export default EmployeeSalaryList;
