import express from "express";
import { createGameAndActivityRequestController } from "../controllers/gamesAndActivityRequestController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes

router.post(
  "/create-gameandactivityRequest",
  formidable(),
  createGameAndActivityRequestController
);

export default router;
