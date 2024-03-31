import React from "react";
import AdminActivityMenu from "../../components/Layout/AdminActivityMenu";
import Layout from "../../components/Layout/Layout";

export const ViewAllRequests = () => {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminActivityMenu />
          </div>
          <div className="col-md-9">
            <h1>All requested Games And Activities</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewAllRequests;
