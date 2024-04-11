import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Radio, Spin } from "antd";

const BookedActivities = () => {
  const [auth] = useAuth();
  const [gamesandactivitiesrequests, setGamesAndActivitiesRequests] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookedActivities = async () => {
    setLoading(true); // Start loading spinner
    try {
      const response = await axios.get(
        "/api/v1/gameandactivityRequest/get-gameandactivityRequest"
      );
      setGamesAndActivitiesRequests(response.data.gameandactivityRequest);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching booked activities:", error);
      toast.error("Something went wrong while fetching requests");
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (true) {
      fetchBookedActivities();
    }

    return () => {
      isMounted = false;
    };
  }, [auth.isAuthenticated]);

  const deleteActivity = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete the Booking?"
      );
      if (confirmed) {
        await axios.delete(
          `/api/v1/gameandactivityRequest/delete-gameandactivityRequest/${id}`
        );
        // Update the list of requests after deletion
        //getAllGamesAndActivitiesRequest();
        //fetchBookedActivities();
        toast.success("Request deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error("Failed to delete request");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const userActivities = gamesandactivitiesrequests.filter(
    (activity) => activity.regiEmail === auth.user.email
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString();
  };

  return (
    <Layout title={"Booked Activities"}>
      <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <div className="row mt-3">
              <h1 className="text-center">Booked Games and Activities</h1>
              <div className="d-flex flex-wrap">
                {/* Display loading spinner when loading */}
                {loading ? (
                  <div className="w-100 text-center">
                    <Spin size="large" />
                  </div>
                ) : userActivities.length === 0 ? (
                  <p>No booked activities found for this user.</p>
                ) : (
                  userActivities.map((activity) => (
                    <div
                      key={activity._id}
                      className="card m-4"
                      style={{ width: "18rem" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{activity.name}</h5>
                        <br />

                        <h6 className="card-subtitle mb-2 text-body-secondary">
                          No of Participants: {activity.noParticipation}
                        </h6>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                          Scheduled Date: {formatDate(activity.scheduledDate)}
                        </h6>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                          Scheduled Time: {formatTime(activity.Time)}
                        </h6>
                        <br />
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteActivity(activity._id)}
                        >
                          Delete Booking
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookedActivities;
