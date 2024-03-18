import React, { useEffect, useState } from 'react'
import { selectDate, selectShowTime } from '../recoil/atom/commonState';
import { useRecoilState } from 'recoil';
import axios from 'axios';

const SelectDate = ({ state }) => {
  // Initialize state for selected date and dates array
  const [selectedDate, setSelectedDate] = useRecoilState(selectDate);
  const [dates, setDates] = useState([]);

  const [showtimes, setShowtimes] = useState([
    "10:00 AM",
    "1:00 PM",
    "4:00 PM",
    "7:00 PM",
    "10:00 PM",
  ]);
  const [selectedShowtime, setSelectedShowtime] = useRecoilState(selectShowTime);

  // Function to format date to "Day, DD MMM" format
  const formatDate = (date) => {
    const options = { weekday: "short", month: "short", day: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // Function to get an array of dates starting from today
  const getDatesFromToday = (numDays) => {
    const datesArray = [];
    const today = new Date();
    for (let i = 0; i < numDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      datesArray.push(date);
    }
    return datesArray;
  };

  // Set dates array when component mounts
  useEffect(() => {
    fetchShowtimes(selectedDate);
    setDates(getDatesFromToday(5)); // Change 5 to the number of days you want to display
  }, [selectedDate]);

  const fetchShowtimes = async (date) => {
    try {
      const response = await axios.get("api-url", {
        params: {
          date: date.toISOString(),
        },
      });
      setShowtimes(response.data.showtimes);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  const handleShowtimeClick = (showtime) => {
    setSelectedShowtime(showtime);
  };


  return (
    <div className="grid place-items-center min-h-0">
      <div className="p-4 grid gap-4 xs:p-8 lg:grid-cols-5 md:grid-cols-1 sm:grid-cols-1 lg:gap-6 container">
        <div className="lg:col-span-2 md:col-span-2 xl:pr-8 inline-block">
          <div className="flex flex-col justify-start lg:justify-start md:justify-start md:items-end">
            <img
              className="lg:w-[75%] xl:w-[75%] h-auto block rounded-lg mb-3"
              src={`${state?.poster_path}`}
              alt={state?.name}
            />
            <div className='flex items-start justify-start'>
            <h2 className="text-start text-black font-bold text-base md:text-center sm:text-left lg:text-left xl:text-base lg:text-base md:text-base mb-6">
              {state?.name}
            </h2>

            </div>
          </div>
        </div>
        <div className="lg:col-span-3 md:col-span-3">
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-center font-bold md:text-xl md:text-center lg:text-start mb-3">
                Select a Date for Ticket Booking
              </h4>

              <div className="flex justify-center lg:justify-start md:justify-center">
                <div className="flex flex-wrap gap-4">
                  {dates.map((date, index) => (
                    <button
                      key={index}
                      className={`py-2 px-4 rounded-lg ${
                        date.getDate() === selectedDate.getDate()
                          ? "bg-secondary text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => setSelectedDate(date)}
                    >
                      {index === 0 ? "Today" : formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-center font-bold md:text-xl md:text-center lg:text-start mb-3">
                Select a showtime
              </h4>

              <div className="flex justify-center lg:justify-start md:justify-center">
                <div className="flex flex-wrap gap-4">
                  {showtimes.map((showtime, index) => (
                    <button
                      key={index}
                      className={`py-2 px-4 rounded-lg ${
                        selectedShowtime === showtime
                          ? "bg-secondary text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                      onClick={() => handleShowtimeClick(showtime)}
                    >
                      {showtime}
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
                    Selected Show time: {selectedShowtime}
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

export default SelectDate