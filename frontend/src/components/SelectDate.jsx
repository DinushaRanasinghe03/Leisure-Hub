import React, { useEffect, useState } from "react";
import {
  moviesSchedules,
  selectDate,
  selectShowTime,
} from "../recoil/atom/commonState";
import { useRecoilState } from "recoil";
import axios from "axios";
import axiosInstance from "../axiosInstance";

const SelectDate = ({ state }) => {
  // Initialize state for selected date and dates array
  const [selectedDate, setSelectedDate] = useRecoilState(selectDate);
  const [movieSchedules, setMovieSchedules] = useRecoilState(moviesSchedules);
  const [dates, setDates] = useState([]);

  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] =
    useRecoilState(selectShowTime);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `/movies/movie-schedules/${state?._id}`
        );
        setMovieSchedules(res?.data?.movieSchedules);

        // Extract unique dates, format them, and add original values
        const uniqueDates = res?.data?.movieSchedules.reduce(
          (unique, schedule) => {
            const date = schedule.date;
            const dateString = new Date(schedule.date).toDateString();
            const formattedDate = formatDate(new Date(dateString));
            const existingDateIndex = unique.findIndex(
              (entry) => entry.formattedDate === formattedDate
            );
            if (existingDateIndex === -1) {
              unique.push({
                formattedDate,
                date,
                showtimes: [
                  {
                    time: schedule.from,
                    scheduleId: schedule._id,
                    unavailableSeats: schedule.unavailable_seats,
                  },
                ],
              });
            } else {
              unique[existingDateIndex].showtimes.push({
                time: schedule.from,
                scheduleId: schedule._id,
                unavailableSeats: schedule.unavailable_seats,
              });
            }
            return unique;
          },
          []
        );

        setDates(uniqueDates);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Function to format date to "Day, MMM DD" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "short", month: "short", day: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedShowtime([]);
    // Find the selected date's showtimes
    const selectedDateShowtimes = dates.find(
      (dateObj) => dateObj.date === date
    )?.showtimes;
    console.log("selectedDateShowtimes", selectedDateShowtimes);
    // Update showtimes based on selected date
    setShowtimes(selectedDateShowtimes || []);
  };

  const handleShowtimeClick = (showtime) => {
    setSelectedShowtime(showtime);
  };

  console.log("dates", dates);
  console.log("selectedShowtime", selectedShowtime);
  console.log("selectedDate", selectedDate);
  console.log("showtimes", showtimes);

  return (
    <div className="grid place-items-center min-h-0">
      <div className="p-4 grid gap-4 xs:p-8 lg:grid-cols-5 md:grid-cols-1 sm:grid-cols-1 lg:gap-6 container">
        <div className="lg:col-span-2 md:col-span-2 xl:pr-8 inline-block">
          <div className="flex flex-col justify-start lg:justify-start md:justify-start md:items-end">
            <img
              className="lg:w-[75%] xl:w-[75%] h-auto block rounded-lg mb-3"
              src={`${state?.imageUrl}`}
              alt={state?.name}
            />
            <div className="flex items-start justify-start">
              <h2 className="text-start text-black font-bold text-base md:text-center sm:text-left lg:text-left xl:text-base lg:text-base md:text-base mb-6">
                {state?.name}
              </h2>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 md:col-span-3">
          <div className="flex flex-col gap-4">
            <div>
              {movieSchedules.length > 0 && (
                <h4 className="text-center font-bold md:text-xl md:text-center lg:text-start mb-3">
                  Select a Date for Ticket Booking
                </h4>
              )}

              <div className="flex justify-center lg:justify-start md:justify-center">
                <div className="flex flex-wrap gap-4">
                  {dates.map((date, index) => (
                    <button
                      key={index}
                      className={`py-2 px-4 rounded-lg ${
                        date?.date === selectedDate
                          ? "bg-secondary text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleDateClick(date?.date)}
                    >
                      {date?.formattedDate}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {showtimes?.length > 0 && (
                <h4 className="text-center font-bold md:text-xl md:text-center lg:text-start mb-3">
                  Select a showtime
                </h4>
              )}

              <div className="flex justify-center lg:justify-start md:justify-center">
                <div className="flex flex-wrap gap-4">
                  {showtimes.map((showtime, index) => (
                    <button
                      key={index}
                      className={`py-2 px-4 rounded-lg ${
                        selectedShowtime?.time === showtime?.time
                          ? "bg-secondary text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                      onClick={() =>
                        handleShowtimeClick({
                          time: showtime?.time,
                          scheduleId: showtime?.scheduleId,
                          unavailableSeats: showtime.unavailableSeats,
                        })
                      }
                    >
                      {showtime?.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[40px]">
            <p className="text-center md:text-md md:text-center lg:text-start">
              <div className="mt-4">
                <p className="font-bold">
                  Selected Date: {formatDate(selectedDate)}
                </p>
                {selectedShowtime && (
                  <p className="font-bold">
                    Selected Show time: {selectedShowtime?.time}
                  </p>
                )}
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDate;