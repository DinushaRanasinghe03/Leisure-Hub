import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SelectDate from "../components/SelectDate";
import * as Yup from "yup";
import { useFormik } from "formik";
import SelectSeat from "../components/SeatBooking";
import SeatBooking from "../components/SeatBooking";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  priceDetails,
  seatsChildCount,
  seatsCount,
  selectSeats,
  selectShowTime,
  userDetails,
  userInfo,
} from "../recoil/atom/commonState";
import { Slide, toast } from "react-toastify";
import SelectAttendee from "../components/SelectAttendee";
import Summary from "../components/Summary";
import axiosInstance from "../axiosInstance";

import Layout from "./../components/Layout/Layout";

const TicketBooking = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const selectedSeats = useRecoilValue(selectSeats);
  const selectedShowtime = useRecoilValue(selectShowTime);
  const selectedSeatsCount = useRecoilValue(seatsCount);
  const selectedChildSeatsCount = useRecoilValue(seatsChildCount);
  const infoRef = useRef();
  const [userDetails, setUserDetails] = useRecoilState(userInfo);
  const selectedPriceDetails = useRecoilValue(priceDetails);

  const [step, setStep] = useState(1);

  const plusSignRegex = /^[^\s+]+@[^\s@]+\.[^\s@]+$/;

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .max(50, "Email must be exactly 50 characters long")
      .test(
        "plus-sign",
        "Please enter a valid email address",
        function (value) {
          return plusSignRegex.test(value);
        }
      ),
    contactNo: Yup.string().required("Mobile number is required"),
    name: Yup.string()
      .required("Name is required")
      .max(50, "Full name must be exactly 50 characters long"),
  });

  const {
    handleSubmit,
    isSubmitting,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    validateForm,
    dirty,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      contactNo: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("...values", values);
      setUserDetails(values);
      handleNextStep();
    },
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step == 1) {
      navigate(-1);
    }
    setStep(step - 1);
  };

  if (infoRef.current) {
    toast.dismiss(infoRef.current);
  }

  const handleNextButtonClick = async () => {
    const isValid = await validateForm();
    if (isValid && step == 2) {
      handleSubmit();
    } else if (selectedShowtime.length == 0 && step == 1) {
      infoRef.current = toast.error("Please select a show time", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } else if (selectedSeats?.length == 0 && step == 3) {
      infoRef.current = toast.error(
        "Please select at least 1 seat to continue",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        }
      );
    } else if (
      selectedSeats?.length > 0 &&
      step == 4 &&
      selectedSeatsCount == 0 &&
      selectedChildSeatsCount == 0
    ) {
      infoRef.current = toast.error("Please select a seat to continue", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } else {
      handleNextStep();
    }
  };

  const submitSummaryData = async (data) => {
    try {
      const response = await axiosInstance.post("/buytickets", {
        schedule_id: selectedShowtime?.scheduleId,
        name: userDetails.name,
        email: userDetails.email,
        mobile: userDetails.contactNo,
        seats: selectedSeats,
        adults: selectedSeatsCount,
        adults_price: selectedPriceDetails?.adultTicketPrice,
        children: selectedChildSeatsCount,
        children_price: selectedPriceDetails?.childTicketPrice,
      });
      // Handle success response
      console.log(
        "Booking data submitted successfully:",
        response.data.booking
      );

      navigate(`/payment/${response.data.booking._id}`);
    } catch (error) {
      // Handle error
      console.error("Error submitting booking data:", error);
    }
  };

  return (
    <Layout title={"Booking Page"}>
      <div
        className={`w-full text-black flex flex-col justify-start items-center gap-10 my-40 ${
          step === 3 || step === 1 || step === 5 ? "" : "h-[500px]"
        }`}
      >
        {step === 1 && <SelectDate state={state} />}

        {step === 2 && (
          <div className="p-4 flex flex-col">
            {/* User details input */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex justify-start items-baseline gap-10">
                <label className=" w-44" htmlFor="">
                  Your Name
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=""
                    className={`border-gray-400 border rounded-lg px-4 py-2 focus:outline-none w-96 ${
                      errors.name && touched.name ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {touched.name && errors.name && (
                    <span className="flex justify-start text-sm font-medium text-red-500 py-2">
                      {errors.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-start items-baseline gap-10">
                <label className=" w-44" htmlFor="">
                  Your Email
                </label>
                <div className="flex flex-col">
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=""
                    className={`border-gray-400 border rounded-lg px-4 py-2 focus:outline-none w-96 ${
                      errors.email && touched.email ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {touched.email && errors.email && (
                    <span className="flex justify-start text-sm font-medium text-red-500 py-2">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-start items-baseline gap-10">
                <label className=" w-44" htmlFor="">
                  Your Mobile Number
                </label>
                <div className="flex flex-col">
                  <input
                    type="tel"
                    name="contactNo"
                    value={values.contactNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=""
                    className={`border-gray-400 border rounded-lg px-4 py-2 focus:outline-none w-96 ${
                      errors.contactNo && touched.contactNo
                        ? "border-red-500"
                        : ""
                    }`}
                    required
                  />
                  {errors.contactNo && touched.contactNo && (
                    <span className="flex justify-start text-sm font-medium text-red-500 py-2">
                      {errors.contactNo}
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}

        {step === 3 && <SeatBooking />}

        {step === 4 && <SelectAttendee state={state} />}

        {step === 5 && <Summary state={state} />}

        <div className="flex gap-10">
          <button
            className="py-2 px-4 rounded-lg border border-secondary text-black w-48 "
            onClick={handlePreviousStep}
          >
            Previous
          </button>
          {step === 5 ? (
            <button
              type="submit"
              className="py-2 px-4 rounded-lg bg-success border border-success text-white w-48"
              onClick={submitSummaryData}
            >
              Submit
            </button>
          ) : (
            <button
              type="submit"
              className="py-2 px-4 rounded-lg bg-primary border border-primary text-white w-48"
              onClick={handleNextButtonClick}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TicketBooking;