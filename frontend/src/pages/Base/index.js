import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../../components/Layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Base = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>leisure Hub</title>
      </Helmet>
      <Header />
      <div
        className="container mx-auto px-4 py-10 lg:px-0"
        style={{ minHeight: "70vh" }}
      >
        <ToastContainer className="md:w-auto max-w-[1200px]" />

        <Outlet />
      </div>
      <Footer />
    </HelmetProvider>
  );
};

export default Base;
