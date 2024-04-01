import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Checkbox } from "antd";

const GamesAndActivities = () => {
  const [gamesandactivities, setGameandactivity] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  //get all games categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/activitycategory/get-activitycategory"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //get games and activities
  const getAllGamesAndActivities = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/gameandactivity/get-gameandactivity"
      );
      setGameandactivity(data.gamesandactivities);
    } catch (error) {
      console.log(error);
    }
  };
  //filter by categories
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    getAllGamesAndActivities();
  }, []);

  return (
    <Layout title="All Games and Activities">
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-ceneter">Filter By Game or Activity Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
        </div>
        <div className="col-md-9">
          <div className="row mt-3">
            {JSON.stringify(checked, null, 4)}
            <h1 className="text-center">All Games and Activities</h1>
            <div className="d-flex flex-wrap">
              {gamesandactivities?.map((g) => (
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
                    <button class="btn btn-primary ms-2">More Details</button>
                    <button class="btn btn-secondary ms-2">Request</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GamesAndActivities;
