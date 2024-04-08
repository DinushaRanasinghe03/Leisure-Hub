import React from 'react';
import{Link} from 'react-router-dom';
import Layout from "../components/layout/LayoutAdmin";

const PageNotFound = () => {
  return (
    <Layout title={"Page not found - LeisureHub"}>
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <Link to="/">Go Back</Link>
    </Layout>
  );
}

export default PageNotFound;
