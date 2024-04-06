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
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "daily_report.pdf";
      a.click();
    } catch (error) {
      console.error("Error downloading daily report:", error);
      toast.error("Failed to download daily report");
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(
        `/api/v1/gameandactivityRequest/delete-gameandactivityRequest/${id}`
      );
      // Update the list of requests after deletion
      getAllGamesAndActivitiesRequest();
      toast.success("Request deleted successfully");
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error("Failed to delete request");
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
                        Game or Activity Name: {request.name}
                      </p>
                      <p className="card-text">
                        Member Name: {request.MemberName}
                      </p>
                      <p className="card-text">
                        Number of Participation: {request.noParticipation}
                      </p>
                      <p className="card-text">
                        Contact Number: {request.contactNo}
                      </p>
                      <p className="card-text">
                        Preferred Date: {request.scheduledDate}
                      </p>
                      <p className="card-text">
                        Preferred Time: {request.Time}
                      </p>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteRequest(request._id)}
                      >
                        Delete
                      </button>
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
