import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
 
const Dashboard = () => {
  const [auth] = useAuth();
 
  // Function to format the date from the date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Get the date part in YYYY-MM-DD format
  };
  return (
    <Layout title={"User Dashboard - Leisure Hub"}>
      <div className="container-flui m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
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
                <div className="col-sm-6">
                  <h4 className="m-b-10 f-w-600">Date of Birth</h4>
                  <h6 className="text-muted f-w-400">
                    {formatDate(auth?.user?.dob)}
                  </h6>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <h4 class="m-b-10 f-w-600">Membership Type:</h4>
                  <h6 class="text-muted f-w-400">{auth?.user?.membership}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
 
export default Dashboard;