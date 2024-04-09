import React from "react";
//import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div class="col-sm-8">
            <div class="card-block">
              <h4 class="m-b-20 p-b-5 b-b-default f-w-600">
                Welcome, {auth?.user?.fname} {auth?.user?.lname}
              </h4>
              <div class="row">
                <div class="col-sm-6">
                  <h5 class="m-b-10 f-w-600">Email</h5>
                  <h6 class="text-muted f-w-400">{auth?.user?.email}</h6>
                </div>
                <div class="col-sm-6">
                  <h4 class="m-b-10 f-w-600">Phone</h4>
                  <h6 class="text-muted f-w-400">{auth?.user?.phone}</h6>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <h4 class="m-b-10 f-w-600">Address</h4>
                  <h6 class="text-muted f-w-400">
                    {auth?.user?.address1} {auth?.user?.address2}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;