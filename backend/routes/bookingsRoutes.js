import express from "express";

import {
  getBookingsController,
  deleteBookingsController,
} from "../controllers/bookingController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes

// GET /api/v1/bookings/get-bookings
router.get("/get-bookings", getBookingsController);

//delete booking
router.delete("/delete-bookings/:id", deleteBookingsController);
export default router;
