import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  priceDetails,
  seatsChildCount,
  seatsCount,
  selectSeats,
} from "../recoil/atom/commonState";
import { useFormik } from "formik";

const SelectAttendee = ({ state }) => {
  const [selectedSeats, setSelectedSeats] = useRecoilState(selectSeats);
  const [selectedSeatsCount, setSelectedSeatsCount] =
    useRecoilState(seatsCount);
  const [selectedChildSeatsCount, setSelectedChildSeatsCount] =
    useRecoilState(seatsChildCount);
  const [selectedPriceDetails, setSelectedPriceDetails] =
    useRecoilState(priceDetails);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    dirty,
    setValues,
  } = useFormik({
    initialValues: {
      adultCount: selectedSeatsCount,
      childCount: selectedChildSeatsCount,
      adultTicketPrice: 1750,
      childTicketPrice: 1500,
      adultSubTotal: "",
      childSubTotal: "",
    },
    onSubmit: (values) => {},
  });

  useEffect(() => {
    setSelectedPriceDetails((prevValues) => ({
      ...prevValues,
      ...values,
      adultSubTotal: values.adultCount * values.adultTicketPrice,
      childSubTotal: values.childCount * values.childTicketPrice,
    }));
  }, [values]);

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      ...values,
      adultCount: selectedSeatsCount,
      childCount: selectedChildSeatsCount,
    }));
  }, [selectedSeatsCount, selectedChildSeatsCount]);

  // console.log("values", values);
  // console.log("selectedSeatsCount", selectedSeatsCount);

  return (
    <div>
      <h2 className="font-semibold text-2xl mb-8">Select Attendees</h2>
      <div className="flex justify-center items-center mb-8">
        <span className="font-semibold text-base">
          {selectedSeats?.length} ticket(s) selected.
        </span>
      </div>
      <div className="flex">
        <form
          //   onSubmit={handleSubmit}
          className="flex flex-col gap-10"
        >
          <div className="flex gap-7">
            <div className="flex justify-start items-baseline gap-10">
              <div className="flex flex-col text-sm gap-2">
                <label className="" htmlFor="">
                  Adults
                </label>
                <div className="flex flex-col">
                  <input
                    min={0}
                    max={selectedSeats?.length}
                    type="number"
                    name="adultCount"
                    value={values?.adultCount}
                    onChange={(e) => {
                      const adultCount = parseInt(e.target.value);
                      setSelectedSeatsCount(adultCount);
                      setValues((prevValues) => ({
                        ...prevValues,
                        adultCount,
                        adultSubTotal: adultCount * prevValues.adultTicketPrice,
                      }));
                      // Decrease childCount if necessary
                      if (adultCount < values.adultCount) {
                        setSelectedChildSeatsCount(
                          (prevChildCount) => prevChildCount + 1
                        );
                      } else {
                        setSelectedChildSeatsCount(
                          (prevChildCount) => prevChildCount - 1
                        );
                      }
                    }}
                    // onBlur={handleBlur}
                    placeholder="0"
                    className={`border-gray-400 border rounded-lg px-4 py-2 focus:outline-none w-28`}
                    // required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-start items-baseline gap-10">
              <div className="flex flex-col text-sm gap-2">
                <label className="" htmlFor="">
                  Ticket Price
                </label>
                <div className="flex flex-col">
                  <input
                    disabled={true}
                    type="number"
                    name="adultTicketPrice"
                    value={values?.adultTicketPrice}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // placeholder=""
                    className={`border-gray-400 border rounded-lg px-4 py-2 focus:outline-none w-28`}
                    // required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-start items-baseline gap-10">
              <div className="flex flex-col text-sm gap-2">
                <label className="" htmlFor="">
                  Subtotal
                </label>
                <div className="flex flex-col">
                  <input
                    disabled={true}
                    type="number"
                    name="adultSubTotal"
                    value={values?.adultTicketPrice * selectedSeatsCount}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    placeholder="0"
                    className={`border-gray-400 border rounded-lg px-4 py-2 focus:outline-none w-28`}
                    // required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-7">
            <div className="flex justify-start items-baseline gap-10">
              <div className="flex flex-col text-sm gap-2">
                <label className="" htmlFor="">
                  Children
                </label>
                <div className="flex flex-col">
                  <input
                    min={0}
                    max={selectedSeats?.length}
                    type="number"
                    name="childCount"
                    value={values.childCount}
                    onChange={(e) => {
                      const childCount = parseInt(e.target.value);
                      setSelectedChildSeatsCount(childCount);
                      setValues((prevValues) => ({
                        ...prevValues,
                        childCount,
                        childSubTotal: childCount * prevValues.childTicketPrice,
                      }));
                      // Decrease adultCount if necessary
                      if (childCount < values.childCount) {
                        setSelectedSeatsCount(
                          (prevAdultCount) => prevAdultCount + 1
                        );
                      } else {
                        setSelectedSeatsCount(
                          (prevAdultCount) => prevAdultCount - 1
                        );
                      }
                    }}
                    // onBlur={handleBlur}
                    placeholder="0"
                    className={`border-gray-400 border rounded-lg px-4 py-2 focus:outline-none w-28`}
                    // required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-start items-baseline gap-10">
              <div className="flex flex-col text-sm gap-2">
                <label className="" htmlFor="">
                  Ticket Price
                </label>
                <div className="flex flex-col">
                  <input
                    disabled={true}
                    type="number"
                    name="childTicketPrice"
                    value={values.childTicketPrice}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    placeholder=""
                    className={`border-gray-400 border rounded-lg px-4 py-2 focus:outline-none w-28`}
                    // required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-start items-baseline gap-10">
              <div className="flex flex-col text-sm gap-2">
                <label className="" htmlFor="">
                  Subtotal
                </label>
                <div className="flex flex-col">
                  <input
                    disabled={true}
                    type="number"
                    name="childSubTotal"
                    value={values?.childCount * values?.childTicketPrice}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    placeholder="0"
                    className={`border-gray-400 border rounded-lg px-4 py-2 focus:outline-none w-28`}
                    // required
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SelectAttendee;