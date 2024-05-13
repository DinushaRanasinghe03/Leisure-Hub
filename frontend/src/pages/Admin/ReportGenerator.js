import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import LEISUREHUB_LOGO from "./../../assets/LEISUREHUB_LOGO.jpg";
import { format } from "date-fns"; // Import format from date-fns
 
const ReportGenerator = ({ users }) => {
  // Function to generate the PDF report
  const generatePDFReport = () => {
    // Initialize jsPDF instance
    const doc = new jsPDF();
 
    // Define page width and logo dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 40; // Adjust as needed
    const logoHeight = 40;
 
    // Calculate the x coordinate to position the logo on the right side
    const logoXPosition = pageWidth - logoWidth - 10; // 10 points padding from the right edge
 
    // Add the company logo
    doc.addImage(
      LEISUREHUB_LOGO,
      "JPEG",
      logoXPosition,
      7,
      logoWidth,
      logoHeight
    );
 
    // Set header text
    doc.setFontSize(18);
 
    // Calculate the y position for the company details
    const headerYPosition = 20; // Adjust as needed
 
    // Add company details
    doc.setFontSize(10);
    doc.text("LEISUREHUB", 10, headerYPosition);
    doc.text("Address: A810, Kaduwela", 10, headerYPosition + 5);
    doc.text("Contact: 0786453567", 10, headerYPosition + 10);
    doc.text("Email: info@leisurehub.gov.lk", 10, headerYPosition + 15);
 
    // Calculate the y position for the horizontal line
    const lineYPosition = headerYPosition + 25;
 
    // Draw a horizontal line
    doc.line(10, lineYPosition, pageWidth - 10, lineYPosition); // Draw a line from left to right margins
 
    // Calculate the starting y-coordinate for the "User Analysis" section
    const analysisStartY = lineYPosition + 10; // Adjust the spacing as needed
 
    // Add "User Analysis" header
    doc.setFontSize(14);
    doc.text("User Analysis", 10, analysisStartY);
 
    // Add analysis details
    doc.setFontSize(10);
    doc.text(`Total Users: ${users.length}`, 10, analysisStartY + 10);
 
    // Add Membership Type
    const membershipTypes = {};
    users.forEach((user) => {
      membershipTypes[user.membership] =
        (membershipTypes[user.membership] || 0) + 1;
    });
 
    // Display membership type distribution
    let membershipStartY = analysisStartY + 20; // Adjust as needed
    doc.text("Membership Type Distribution:", 10, membershipStartY);
    let offset = 5;
    for (const [type, count] of Object.entries(membershipTypes)) {
      doc.text(`${type}: ${count}`, 10, membershipStartY + offset);
      offset += 5;
    }
 
    // Calculate the starting y-coordinate for the table
    const tableStartY = membershipStartY + offset + 10; // Adjust as needed for spacing
 
    // Create the table with user data
    doc.autoTable({
      startY: tableStartY,
      margin: { left: 10, right: 10 },
      head: [["Name", "Email", "Phone", "Address", "DOB", "Membership Type"]],
      body: users.map((user) => [
        `${user.fname} ${user.lname}`,
        user.email,
        user.phone,
        `${user.address1}, ${user.address2}`,
        format(new Date(user.dob), "yyyy-MM-dd"),
        user.membership,
      ]),
      styles: {
        headStyles: {
          fillColor: [255, 194, 207], // Blue background for header
          textColor: [255, 255, 255], // White text color for header
        },
      },
    });
 
    // Save the PDF file
    doc.save("users_report.pdf");
  };
 
  return (
    <div>
      <button onClick={generatePDFReport} className="btn btn-success mt-3">
        Generate PDF Report
      </button>
    </div>
  );
};
 
export default ReportGenerator;