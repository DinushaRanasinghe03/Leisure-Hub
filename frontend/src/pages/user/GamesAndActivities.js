import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Radio } from "antd";
import SearchInput from "../../components/Form/SearchInput";

const GamesAndActivities = () => {
  const navigate = useNavigate();
  const [gamesandactivities, setGameandactivity] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Get all games categories
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

  // Get games and activities
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

  // Filter by category
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    if (!categoryId) {
      getAllGamesAndActivities();
    } else {
      try {
        const { data } = await axios.post(
          `/api/v1/gameandactivity/gameandactivity-filters`,
          { checked: [categoryId] }
        );
        setGameandactivity(data?.gamesandactivities);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Layout title="All Games and Activities">
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-2">
            <h5 className="text-left">
              Explore Games and Activities by Category
            </h5>
            <div className="d-flex flex-column">
              <Radio.Group
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <Radio.Button value={null}>All</Radio.Button>
                {categories?.map((c) => (
                  <Radio.Button key={c._id} value={c._id}>
                    {c.name}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>
          </div>
          <div className="col-md-10">
            <div className="row mt-3">
              <SearchInput />
              <h1 className="text-center">Games and Activities</h1>
              <h6 className="text-center">
                Elevate your leisure with our streamlined online scheduling for
                games and activities.
              </h6>
              <div className="d-flex flex-wrap">
                {gamesandactivities?.map((g) => (
                  <div
                    className="card m-4"
                    style={{ width: "18rem" }}
                    key={g._id}
                  >
                    <img
                      src={`/api/v1/gameandactivity/gameandactivity-activityimage/${g._id}`}
                      className="card-img-top"
                      alt={g.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{g.name}</h5>
                      <p className="card-text">
                        {g.description.substring(0, 30)}...
                      </p>
                      <p className="card-text">
                        {g.guidelines.substring(0, 30)}...
                      </p>
                      <button
                        className="btn btn-primary ms-2"
                        onClick={() => navigate(`/activity/${g.slug}`)}
                      >
                        More Details
                      </button>
                      <button className="btn btn-secondary ms-2">
                        Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GamesAndActivities;
