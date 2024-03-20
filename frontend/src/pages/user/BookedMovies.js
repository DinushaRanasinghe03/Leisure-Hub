import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";

const BookedMovies = () => {
  return (
    <Layout title={"Booked Movies"}>
      <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Booked Movies</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookedMovies;
