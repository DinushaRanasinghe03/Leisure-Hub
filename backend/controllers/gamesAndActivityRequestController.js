import GamesAndActivitiesRequestModel from "../models/GamesAndActivitiesRequestModel.js";
import fs from "fs";

export const createGameAndActivityRequestController = async (req, res) => {
  try {
    const {
      name,
      MemberName,
      noParticipation,
      contactNo,
      scheduledDate,
      Time,
    } = req.fields;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !MemberName:
        return res.status(500).send({ error: "Member Name is Required" });
      case !noParticipation:
        return res
          .status(500)
          .send({ error: "No of Participation is Required" });
      case !contactNo:
        return res.status(500).send({ error: "Contact no is Required" });
      case !scheduledDate:
        return res.status(500).send({ error: "Schedule date is Required" });
      case !Time:
        return res.status(500).send({ error: "Time is Required" });
    }
    const gamesAndActivitiesRequest = new GamesAndActivitiesRequestModel({
      ...req.fields,
    });
    await gamesAndActivitiesRequest.save();
    res.status(201).send({
      success: true,
      message: "Game or Activity Request successfully",
      gamesAndActivitiesRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating request",
    });
  }
};
