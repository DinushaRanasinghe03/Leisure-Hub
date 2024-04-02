import React, { useState, useEffect } from "react";
import AdminActivityMenu from "../../components/Layout/AdminActivityMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SearchInput from "../../components/Form/SearchInput";
export const AllGamesAndActivities = () => {
  const [gamesandactivities, setGameandactivity] = useState([]);

  //getall activities
  const getAllGamesAndActivities = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/gameandactivity/get-gameandactivity"
      );
      setGameandactivity(data.gamesandactivities);
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong");
    }
  };

  //Lifecycle method
  useEffect(() => {
    getAllGamesAndActivities();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminActivityMenu />
          </div>
          <div className="col-md-9 ">
            <div className="row mt-3">
              <h1 className="text-center">All Games And Activities</h1>
              <div className="d-flex flex-wrap">
                {gamesandactivities?.map((g) => (
                  <Link
                    key={g._id}
                    to={`/adminactivitydashboard/activitymanagement/allgamesandactivities/${g.slug}`}
                    className="gamesandactivities-link"
                  >
                    <div className="card m-4" style={{ width: "18rem" }}>
                      <img
                        src={`/api/v1/gameandactivity/gameandactivity-activityimage/${g._id}`}
                        className="card-img-top"
                        alt={g.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{g.name}</h5>
                        <p className="card-text">{g.description}</p>
                        <p className="card-text">{g.guidelines}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllGamesAndActivities;
