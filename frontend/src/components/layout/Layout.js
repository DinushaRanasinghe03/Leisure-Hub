import React from "react";
import Header from "./Header";
//import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <ToastContainer />
        {children}
      </main>

    </div>
  );
};

Layout.defaultProps = {
  title: "LeisureHub",
  description: "M E R N stack project",
  keywords: "react,node,express,mongodb",
  author: "Student Jam",
};

export default Layout;
