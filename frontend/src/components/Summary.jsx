import React from "react";
import { useRecoilValue } from "recoil";
import {
  priceDetails,
  selectDate,
  selectSeats,
  selectShowTime,
  userInfo,
} from "../recoil/atom/commonState";
import { formatAmount } from "./helpers";

const Summary = ({ state }) => {
  const selectedDate = useRecoilValue(selectDate);
  const selectedShowtime = useRecoilValue(selectShowTime);
  const userDetails = useRecoilValue(userInfo);
  const selectedSeats = useRecoilValue(selectSeats);
  const selectedPriceDetails = useRecoilValue(priceDetails);



  const date = new Date(selectedDate);

  // Get day, month, and year
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  // Get day of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];

  // Construct the formatted date string
  const formattedDate = `${day}-${month}-${year} - ${dayOfWeek}`;


  return (
    <>
      <h2 className="font-semibold text-2xl mb-2">Summary</h2>
      <div className="flex justify-start items-start flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold">Showtime</h2>
          <div className="flex justify-start items-center gap-8">
            <div className="bg-secondary text-white font-semibold px-8 py-3 text-end w-44 tracking-wider">
              Movie Name
            </div>

            <div className=" text-black font-semibold">{state.name}</div>
          </div>

          <div className="flex justify-start items-center gap-8">
            <div className="bg-secondary text-white font-semibold px-8 py-3 text-end w-44 tracking-wider">
              Showtime
            </div>

            <div className=" text-black font-semibold">
              {formattedDate} - {selectedShowtime}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-semibold">Your details</h2>
          <div className="flex justify-start items-center gap-8">
            <div className="bg-secondary text-white font-semibold px-8 py-3 text-end w-44 tracking-wider">
              Name
            </div>

            <div className=" text-black font-semibold">{userDetails.name}</div>
          </div>

          <div className="flex justify-start items-center gap-8">
            <div className="bg-secondary text-white font-semibold px-8 py-3 text-end whitespace-nowrap w-44 tracking-wider">
              Phone Number
            </div>

            <div className=" text-black font-semibold">
              {userDetails.contactNo}
            </div>
          </div>

          <div className="flex justify-center items-center gap-8">
            <div className="bg-secondary text-white font-semibold px-8 py-3 text-end w-44 tracking-wider">
              Email
            </div>

            <div className=" text-black font-semibold">{userDetails.email}</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-semibold">Ticket details</h2>
          <div className="flex justify-start items-center gap-8">
            <div className="bg-secondary text-white font-semibold px-8 py-3 text-end w-44 tracking-wider">
              Tickets
            </div>

            <div className=" text-black font-semibold">
              {selectedSeats?.length}
            </div>
          </div>

          <div className="flex justify-start items-center gap-8">
            <div className="bg-secondary text-white font-semibold px-8 py-3 text-end whitespace-nowrap w-44 tracking-wider">
              Seats
            </div>

            <div className=" text-black font-semibold">
              {selectedSeats.join(", ")}
            </div>
          </div>

          <div className="flex justify-start items-center gap-8">
            <div className="bg-secondary text-white font-semibold px-8 py-3 text-end w-44 tracking-wider">
              Adults
            </div>

            <div className=" text-black font-semibold">
              {selectedPriceDetails.adultCount} x LKR{" "}
              {formatAmount(selectedPriceDetails?.adultTicketPrice)} - LKR{" "}
              {formatAmount(selectedPriceDetails?.adultSubTotal)}
            </div>
          </div>

          {selectedPriceDetails.childCount > 0 && (
            <div className="flex justify-center items-center gap-8">
              <div className="bg-secondary text-white font-semibold px-8 py-3 text-end w-44 tracking-wider">
                Childrens
              </div>

              <div className=" text-black font-semibold">
                {selectedPriceDetails.childCount} x LKR{" "}
                {formatAmount(selectedPriceDetails?.childTicketPrice)} - LKR{" "}
                {formatAmount(selectedPriceDetails?.childSubTotal)}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-start items-center gap-8 mt-10">
          <div className="bg-secondary text-white font-semibold px-8 py-3 text-end w-44 tracking-wider">
            Total
          </div>

          <div className=" text-black font-semibold">
            LKR{" "}
            {formatAmount(
              selectedPriceDetails?.adultSubTotal +
                selectedPriceDetails?.childSubTotal
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
