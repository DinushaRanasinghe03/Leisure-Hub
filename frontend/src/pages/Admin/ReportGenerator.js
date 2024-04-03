import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ReportGenerator = ({ users }) => {
  // Function to generate PDF report
  const generatePDFReport = () => {
    // Initialize jsPDF instance
    const doc = new jsPDF();

    // Set document header
    doc.setFontSize(18);
    doc.text("User Report", 14, 20);

    // Create table with user data
    doc.autoTable({
      head: [["Name", "Email", "Phone", "Address", "DOB", "Membership Type"]],
      body: users.map((user) => [
        `${user.fname} ${user.lname}`,
        user.email,
        user.phone,
        `${user.address1}, ${user.address2}`,
        user.dob,
        user.membership,
      ]),
    });

    // Save PDF file
    doc.save("users_report.pdf");
  };

  return (
    <div>
      <button onClick={generatePDFReport}>Generate PDF Report</button>
    </div>
  );
};

export default ReportGenerator;
