import express from "express";
import {
  createGameAndActivityController,
  deleteGameAndActivityController,
  gameandactivityImageController,
  getGameAndActivityController,
  getSingleGameAndActivityController,
  searchGameAndActivityController,
  updateGameAndActivityController,
} from "../controllers/gamesAndActivityController.js";
import formidable from "express-formidable";
const router = express.Router();

//routes
router.post(
  "/create-gameandactivity",
  formidable(),
  createGameAndActivityController
);

//update routes
router.put(
  "/update-gameandactivity/:apid",
  formidable(),
  updateGameAndActivityController
);

//get gameandactivity
router.get("/get-gameandactivity", getGameAndActivityController);

//single gameandactivity
router.get("/get-gameandactivity/:slug", getSingleGameAndActivityController);

//get photo
router.get(
  "/gameandactivity-activityimage/:apid",
  gameandactivityImageController
);

//delete gameandactivity
router.delete("/delete-gameandactivity/:apid", deleteGameAndActivityController);

//search games and activities
router.get("search/:keyword", searchGameAndActivityController);

export default router;
