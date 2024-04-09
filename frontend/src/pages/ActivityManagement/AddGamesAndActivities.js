import React, { useState, useEffect } from "react";
import AdminActivityMenu from "../../components/Layout/AdminActivityMenu";
import axios from "axios";
//import toast from "react-hot-toast";
import toast, { Toaster } from 'react-hot-toast';
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import LayoutAdmin from './../../components/Layout/LayoutAdmin';
const { Option } = Select;

export const AddGamesAndActivities = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [activityimage, setaImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gameoractivitycategory, setGameoractivitycategory] = useState("");
  const [guidelines, setGuidelines] = useState("");
  const [instructors, setInstructor] = useState("");

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
      toast.error(
        "Something went wrong in getting Games and Activities Category"
      );
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //add games and activities function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const gameandactivityData = new FormData();
      gameandactivityData.append("name", name);
      gameandactivityData.append("description", description);
      gameandactivityData.append("guidelines", guidelines);
      gameandactivityData.append("instructors", instructors);
      gameandactivityData.append("activityimage", activityimage);
      gameandactivityData.append(
        "gameoractivitycategory",
        gameoractivitycategory
      );
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/gameandactivity/create-gameandactivity",
        gameandactivityData
      );
      if (data?.success) {
        navigate("/adminactivitydashboard/activitymanagement/activities");
        setTimeout(() => {
          toast.success("Game or Activity Added Successfully");
        }, 1000);
      } else {
        toast.error("Somthing");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <LayoutAdmin>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminActivityMenu />
          </div>
          <div className="col-md-9">
            <h1>Add Games And Activities</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select game or activity category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setGameoractivitycategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {activityimage
                    ? activityimage.name
                    : " Upload game or activity image"}

                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setaImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {activityimage && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(activityimage)}
                      alt="gameandactivity_activityimage"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write game or activity name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="write a desciption about the game or activity"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={guidelines}
                  placeholder="write guidlines for the game or activity"
                  className="form-control"
                  onChange={(e) => setGuidelines(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Availability of Instructor"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setInstructor(value);
                  }}
                >
                  <Option value="1">Instructor Available</Option>
                  <Option value="0">Instructor Not Available</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  ADD GAME OR ACTIVITY
                </button>
              </div>
            </div>
          </div>
        </div>
        <Toaster/>
      </div>
      </LayoutAdmin>
  );
};

export default AddGamesAndActivities;
