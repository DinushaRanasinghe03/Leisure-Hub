import React, { useEffect, useState } from "react";
import {
  moviesSchedules,
  seatsCount,
  selectSeats,
  selectShowTime,
} from "../recoil/atom/commonState";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

const generateSampleSeats = (unavailableSeats) => {
  const seats = [];
  for (let i = 1; i <= 50; i++) {
    const isAvailable = !unavailableSeats.includes(i.toString());
    seats.push({ id: i, isAvailable });
  }
  return seats;
};

const SeatBooking = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useRecoilState(selectSeats);
  const [selectedSeatsCount, setSelectedSeatsCount] =
    useRecoilState(seatsCount);
  const [availableSeatsCount, setAvailableSeatsCount] = useState(0);
  const [unavailableSeatsCount, setUnavailableSeatsCount] = useState(0);

  const selectedShowtime = useRecoilValue(selectShowTime);

  console.log("selectedShowtime", selectedShowtime?.unavailableSeats);

  useEffect(() => {
    // Set sample seat data and counts
    const sampleSeatsData = generateSampleSeats(
      selectedShowtime?.unavailableSeats || []
    );
    setSeats(sampleSeatsData);
    const availableCount = sampleSeatsData.filter(
      (seat) => seat.isAvailable
    ).length;
    setAvailableSeatsCount(availableCount);
    setUnavailableSeatsCount(sampleSeatsData.length - availableCount);
  }, [selectedShowtime]);

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
              className={`seat !bg-secondary cursor-pointer rounded-lg px-4 py-3 w-20 text-center font-semibold ${
                selectedSeats.includes(seat.id) ? "!bg-selected" : ""
              } ${seat.isAvailable ? "!bg-secondary" : "!bg-unavailable"}`}
              onClick={() => handleSeatClick(seat.id)}
            >
              {seat.id}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="!bg-secondary h-5 w-5"></div>
          <span className="font-semibold text-base">Available</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="!bg-unavailable h-5 w-5"></div>
          <span className="font-semibold text-base">Unavailable</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="!bg-selected h-5 w-5"></div>
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