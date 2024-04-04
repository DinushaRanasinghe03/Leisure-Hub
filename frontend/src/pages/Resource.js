import React from "react";
import Layout from "../components/layout/Layout";
import { NavLink } from "react-router-dom";
import ResourceTable from "../components/layout/ResourceTable";

const Resource = () => {
  return (
    <Layout title={"Admin Resources - LeisureHub"}>
      <NavLink to="/addResource">Add Resource</NavLink>
      <div>
        <ResourceTable />
      </div>
    </Layout>
  );
};

export default Resource;
