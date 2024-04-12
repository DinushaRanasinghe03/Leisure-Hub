import React, { useState, useEffect } from "react";

import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";

import { Spin } from "antd";
import toast, { Toaster } from "react-hot-toast";

const BookedMovies = () => {
  const [auth] = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookedMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/v1/bookings/get-bookings"
      );
      const bookedMovies = response.data.bookings;

      // Fetch movie details for each booking
      const bookingsWithMovies = await Promise.all(
        bookedMovies.map(async (booking) => {
          const movieResponse = await axios.get(
            `http://localhost:8080/api/v1/movies/get-movie-title/${booking.movie}`
          );
          const movieDetails = movieResponse.data;
          return { ...booking, movieName: movieDetails.name };
        })
      );

      //fetch schedule details

      setBookings(bookingsWithMovies);
    } catch (error) {
      console.error("Error fetching booked movies:", error);
      toast.error("Something went wrong while fetching booked movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedMovies();
  }, [auth.isAuthenticated]);

  const deleteBooking = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete the Booking?"
      );
      if (confirmed) {
        await axios.delete(`/api/v1/bookings/delete-bookings/${id}`);
        // Update the list of requests after deletion
        fetchBookedMovies();
        // Show success toast message
        toast.success("Movie Booking deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error("Failed to delete Movie Booking");
    }
  };

  const userBookings = bookings.filter(
    (booking) => booking.email === auth.user.email
  );

  return (
    <Layout title="Booked Movies">
      <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="row mt-3">
              <h1 className="text-center">Booked Movies</h1>
              <div className="d-flex flex-wrap">
                {loading ? (
                  <Spin />
                ) : userBookings.length === 0 ? (
                  <p>No booked movies found for this user.</p>
                ) : (
                  userBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="card m-4"
                      style={{ width: "18rem" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{booking.movieName}</h5>
                        <br />
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                          {/* Seats: {booking.seats} */}
                          Seat no: {booking.seats.join(" , ")}{" "}
                          {/* Join seats with a comma */}
                        </h6>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                          Adults: {booking.adults}
                        </h6>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                          Children: {booking.children}
                        </h6>
                        <br />
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteBooking(booking._id)}
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
      <Toaster />
    </Layout>
  );
};

export default BookedMovies;
