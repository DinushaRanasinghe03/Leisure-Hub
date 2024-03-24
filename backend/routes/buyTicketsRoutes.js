import express from "express";
import {
  newBookingController,
  getBookingController,
} from "../controllers/bookingController.js";

const router = express.Router();
router.get("/", getBookingController);
router.post("/", newBookingController);

export default router;
