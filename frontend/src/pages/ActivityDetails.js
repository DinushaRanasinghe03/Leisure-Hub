import Layout from "../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ActivityDetails = () => {
  const params = useParams();
  const [gameandactivity, setGameandactivity] = useState({});
  const [relatedGameAndActivity, setRelatedGameAndActivity] = useState([]);

  // Initial details
  useEffect(() => {
    if (params?.slug) getGameAndActivity();
  }, [params?.slug]);

  // Get game and activity details
  const getGameAndActivity = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/gameandactivity/get-gameandactivity/${params.slug}`
      );
      setGameandactivity(data?.gamesandactivities);
      getSimilarGameAndActivity(
        data?.gameandactivity._id,
        data?.gameandactivity.gameoractivitycategory._id
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar games and activities
  const getSimilarGameAndActivity = async (apid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/gameandactivity/relatedd-gameandactivity/${apid}/${cid}`
      );
      setRelatedGameAndActivity(data?.gamesandactivities);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6 ">
          <img
            src={`/api/v1/gameandactivity/gameandactivity-activityimage/${gameandactivity._id}`}
            className="card-img-top"
            alt={gameandactivity.name}
            height="300"
            width="350"
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Games and Activity Details</h1>
          <h6>Name: {gameandactivity.name}</h6>
          <br />
          <h6>Description: {gameandactivity.description}</h6>
          <br />
          <h6>Guidelines: {gameandactivity.guidelines}</h6>
          <br />
          <h6>Category: {gameandactivity?.gameoractivitycategory?.name}</h6>
          <br />
          <h6>Instructors: {gameandactivity?.instructors?.name}</h6>
          <button className="btn btn-secondary ms-2">Request</button>
        </div>
      </div>

      <hr />
      <div className="row container">
        <h6>Similar Games and Activities</h6>
        {relatedGameAndActivity.length < 1 && (
          <p className="text-center">No similar Game Or Activity found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedGameAndActivity?.map((g) => (
            <div className="card m-4" style={{ width: "18rem" }} key={g._id}>
              <img
                src={`/api/v1/gameandactivity/gameandactivity-activityimage/${g._id}`}
                className="card-img-top"
                alt={g.name}
              />
              <div className="card-body">
                <h5 className="card-title">{g.name}</h5>
                <p className="card-text">{g.description.substring(0, 30)}...</p>
                <p className="card-text">{g.guidelines}</p>

                <button className="btn btn-secondary ms-2">Request</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ActivityDetails;
