import express from "express";
import {
  createMovieController,
  deleteMovieController,
  getMovieController,
  getSingleMovieController,
  movieFiltersController,
  moviePosterimageController,
  searchMovieController,
  updateMovieController,
  getMovieSchedulesController,
} from "../controllers/movieController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
//add movies
router.post("/create-movie", formidable(), createMovieController);

//get movies
router.get("/get-movie", getMovieController);

//get single movie
router.get("/get-movie/:slug", getSingleMovieController);

//get movie schedules
router.get("/movie-schedules/:id", getMovieSchedulesController);

//get photo
router.get("/movie-posterimage/:mid", moviePosterimageController);

//delete movie
router.delete("/delete-movie/:mid", deleteMovieController);

//update movie
router.put("/update-movie/:mid", formidable(), updateMovieController);

//filter movie
router.post("/movie-filters", movieFiltersController);

//search movie
router.get("/search-movie/:keyword", searchMovieController);

export default router;
