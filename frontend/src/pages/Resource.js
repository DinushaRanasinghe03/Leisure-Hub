import React from "react";
import Layout from "../components/layout/Layout";
import ResourceTable from "../components/layout/ResourceTable";
import { Link } from "react-router-dom";
import "./Resources/AddResource.css";

const Resource = () => {
  return (
    <Layout title={"Admin Resources - LeisureHub"}>
      <Link to={`/addResource`}>
        <button className="addResource-button">Add Resource</button>
      </Link>

      <div>
        <ResourceTable />
      </div>
    </Layout>
  );
};

export default Resource;
