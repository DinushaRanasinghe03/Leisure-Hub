import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminActivityMenu from "../../components/Layout/AdminActivityMenu";
import toast from "react-hot-toast";
import axios from "axios";

export const ViewAllRequests = () => {
  const [gamesAndActivitiesRequest, setGamesAndActivitiesRequest] = useState(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllGamesAndActivitiesRequest();
  }, []);

  const getAllGamesAndActivitiesRequest = async () => {
    try {
      const response = await axios.get(
        "/api/v1/gameandactivityRequest/get-gameandactivityRequest"
      );
      setGamesAndActivitiesRequest(response.data.gameandactivityRequest);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Something went wrong while fetching requests");
    }
  };

  const downloadDailyReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "/api/v1/gameandactivityRequest/daily-report",
        {
          responseType: "blob", // Ensure response type is set to blob to handle binary data
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" }); // Change the content type to "application/pdf"
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "daily_report.pdf"; // Specify the filename with a .pdf extension for the downloaded PDF file
      a.click();
    } catch (error) {
      console.error("Error downloading daily report:", error);
      toast.error("Failed to download daily report");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminActivityMenu />
          </div>
          <div className="col-md-9">
            <div className="row mt-3">
              <h1 className="text-center">All User Requests</h1>
              <div className="d-flex flex-wrap">
                {gamesAndActivitiesRequest.map((request) => (
                  <div
                    className="card m-4"
                    style={{ width: "18rem" }}
                    key={request._id}
                  >
                    <div className="card-body">
                      <p className="card-text">
                        Game or Activity Name :{request.name}
                      </p>
                      <p className="card-text">
                        Member Name :{request.MemberName}
                      </p>
                      <p className="card-text">
                        Number of Participation :{request.noParticipation}
                      </p>
                      <p className="card-text">
                        Contact Number :{request.contactNo}
                      </p>
                      <p className="card-text">
                        Preffered Date :{request.scheduledDate}
                      </p>
                      <p className="card-text">
                        Preffered Time :{request.Time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="row mt-3">
              <div className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={downloadDailyReport}
                  disabled={loading}
                >
                  {loading ? "Downloading..." : "Download Daily Report"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewAllRequests;
