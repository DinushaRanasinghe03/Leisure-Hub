import React, { useEffect, useState } from "react";
import { seatsCount, selectSeats } from "../recoil/atom/commonState";
import { useRecoilState } from "recoil";
import axios from "axios";

const generateSampleSeats = () => {
  const seats = [];
  for (let i = 1; i <= 50; i++) {
    let isAvailable = true;
    // Mark some seats as unavailable based on their ID
    if (i === 10 || i === 20 || i === 30) {
      isAvailable = false;
    }
    seats.push({ id: i, isAvailable });
  }
  return seats;
};


const SeatBooking = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useRecoilState(selectSeats);
  const [selectedSeatsCount, setSelectedSeatsCount] = useRecoilState(seatsCount);
  const [availableSeatsCount, setAvailableSeatsCount] = useState(0);
  const [unavailableSeatsCount, setUnavailableSeatsCount] = useState(0);
  // useEffect(() => {
  //   // Fetch seat data and counts from the backend API
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get("backend-api-url/seats");
  //       const { seats, availableSeatsCount, unavailableSeatsCount } =
  //         response.data;
  //       setSeats(seats);
  //       setAvailableSeatsCount(availableSeatsCount);
  //       setUnavailableSeatsCount(unavailableSeatsCount);
  //     } catch (error) {
  //       console.error("Error fetching seat data:", error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    // Set sample seat data and counts
    const sampleSeatsData = generateSampleSeats();
    setSeats(sampleSeatsData);
    const availableCount = sampleSeatsData.filter(
      (seat) => seat.isAvailable
    ).length;
    setAvailableSeatsCount(availableCount);
    setUnavailableSeatsCount(sampleSeatsData.length - availableCount);
  }, []);

  const handleSeatClick = (seatId) => {
    const seat = seats.find((seat) => seat.id === seatId);
    if (!seat.isAvailable) {
      // Seat is unavailable, do nothing
      return;
    }

    const index = selectedSeats.indexOf(seatId);
    if (index === -1) {
      // Seat not selected, add to selectedSeats
      setSelectedSeats([...selectedSeats, seatId]);
      if (selectedSeats) {
        setSelectedSeatsCount([...selectedSeats, seatId]?.length);
      }
    } else {
      // Seat already selected, remove from selectedSeats
      const updatedSelectedSeats = [...selectedSeats];
      updatedSelectedSeats.splice(index, 1);
      setSelectedSeats(updatedSelectedSeats);
      if (selectedSeats) {
        setSelectedSeatsCount(updatedSelectedSeats?.length);
      }
      
    }
  };


  return (
    <>
      <div className="w-full flex justify-center items-start flex-col px-72 gap-6">
        <h2 className="font-semibold text-2xl">Seat Booking</h2>
        <div className="flex flex-wrap gap-4">
          {seats.map((seat) => (
            <div
              key={seat.id}
              className={`seat bg-secondary cursor-pointer rounded-lg px-4 py-3 w-20 text-center font-semibold ${
                selectedSeats.includes(seat.id) ? "bg-selected" : ""
              } ${seat.isAvailable ? "bg-secondary" : "bg-unavailable"}`}
              onClick={() => handleSeatClick(seat.id)}
            >
              {seat.id}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="bg-secondary h-5 w-5"></div>
          <span className="font-semibold text-base">Available</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-unavailable h-5 w-5"></div>
          <span className="font-semibold text-base">Unavailable</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-selected h-5 w-5"></div>
          <span className="font-semibold text-base">Selected</span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <span className="font-semibold text-base">
          {selectedSeats?.length} ticket(s) selected.
        </span>
      </div>
    </>
  );
};

export default SeatBooking;
