import GamesAndActivitiesRequestModel from "../models/GamesAndActivitiesRequestModel.js";
import fs from "fs";
import pdf from "html-pdf";
export const createGameAndActivityRequestController = async (req, res) => {
  try {
    const {
      name,
      MemberName,
      noParticipation,
      contactNo,
      scheduledDate,
      Time,
    } = req.fields;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !MemberName:
        return res.status(500).send({ error: "Member Name is Required" });
      case !noParticipation:
        return res
          .status(500)
          .send({ error: "No of Participation is Required" });
      case !contactNo:
        return res.status(500).send({ error: "Contact no is Required" });
      case !scheduledDate:
        return res.status(500).send({ error: "Schedule date is Required" });
      case !Time:
        return res.status(500).send({ error: "Time is Required" });
    }
    const gamesAndActivitiesRequest = new GamesAndActivitiesRequestModel({
      ...req.fields,
    });
    await gamesAndActivitiesRequest.save();
    res.status(201).send({
      success: true,
      message: "Game or Activity Request created successfully",
      gamesAndActivitiesRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating request",
    });
  }
};
// Function to generate HTML content for the daily report
const generateDailyReportHTML = (requests) => {
  // Generate HTML content for the daily report based on the requests data
  let htmlContent = `<h1>Daily Requests Report</h1>`;
  htmlContent += `<table border="1" cellpadding="5"><tr><th>Name</th><th>Member Name</th><th>No of Participation</th><th>Contact No</th><th>Scheduled Date</th><th>Time</th></tr>`;
  requests.forEach((request) => {
    htmlContent += `<tr><td>${request.name}</td><td>${request.MemberName}</td><td>${request.noParticipation}</td><td>${request.contactNo}</td><td>${request.scheduledDate}</td><td>${request.Time}</td></tr>`;
  });
  htmlContent += `</table>`;
  return htmlContent;
};

// Route handler for generating and downloading daily report as PDF
export const generateDailyReportController = async (req, res) => {
  try {
    // Fetch data for the daily report
    const requests = await GamesAndActivitiesRequestModel.find();

    // Generate HTML content for the daily report
    const htmlContent = generateDailyReportHTML(requests);

    // Options for PDF generation
    const pdfOptions = {
      format: "Letter",
    };

    // Generate PDF from HTML content
    pdf
      .create(htmlContent, pdfOptions)
      .toFile("daily_report.pdf", (err, result) => {
        if (err) {
          console.error("Error generating PDF:", err);
          res.status(500).json({ error: "Failed to generate PDF" });
        } else {
          // Send the generated PDF file as a response
          res.download(result.filename, "daily_report.pdf", (err) => {
            if (err) {
              console.error("Error downloading PDF:", err);
              res.status(500).json({ error: "Failed to download PDF" });
            } else {
              // Delete the temporary PDF file after download
              fs.unlinkSync(result.filename);
            }
          });
        }
      });
  } catch (error) {
    console.error("Error generating daily report:", error);
    res.status(500).json({ error: "Failed to generate daily report" });
  }
};

//get all games and activities requests
export const getGamesAndActivityRequestController = async (req, res) => {
  try {
    const gameandactivityRequest = await GamesAndActivitiesRequestModel.find();
    res.status(201).send({
      success: true,
      counTotal: gameandactivityRequest.length,
      message: "All games and Activity requests",
      gameandactivityRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting requests",
      error: error.message,
    });
  }
};
//get single request
export const getSingleGamesAndActivityRequestController = async (req, res) => {
  try {
    const gameandactivityRequest =
      await GamesAndActivitiesRequestModel.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "One request fetched",
      gameandactivityRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single request",
      error,
    });
  }
};

//delete request
export const deleteGamesAndActivityRequestController = async (req, res) => {
  try {
    await GamesAndActivitiesRequestModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Request deleted successfully",
    });
  } catch (error) {
    // Log and send error response if deletion fails
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting request",
      error,
    });
  }
};

//update request
export const updateGameAndActivityRequestController = async (req, res) => {
  try {
    const {
      name,
      MemberName,
      noParticipation,
      contactNo,
      scheduledDate,
      Time,
    } = req.fields;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !MemberName:
        return res.status(500).send({ error: "Member Name is Required" });
      case !noParticipation:
        return res
          .status(500)
          .send({ error: "No of Participation is Required" });
      case !contactNo:
        return res.status(500).send({ error: "Contact no is Required" });
      case !scheduledDate:
        return res.status(500).send({ error: "Schedule date is Required" });
      case !Time:
        return res.status(500).send({ error: "Time is Required" });
    }
    const gamesAndActivitiesRequest =
      await GamesAndActivitiesRequestModel.findByIdAndUpdate(
        req.params.id,
        { name, MemberName, noParticipation, contactNo, scheduledDate, Time },
        { new: true } // Returns the updated document
      );
    await gamesAndActivitiesRequest.save();
    res.status(201).send({
      success: true,
      message: "Game or Activity Request updated successfully",
      gamesAndActivitiesRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating request",
    });
  }
};
