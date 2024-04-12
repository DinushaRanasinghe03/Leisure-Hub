import express from "express";
import {
  createMovieController,
  deleteMovieController,
  getMovieController,
  getMovieSchedulesController,
  getSingleMovieController,
  movieFiltersController,
  moviePosterimageController,
  relatedMovieController,
  searchMovieController,
  updateMovieController,
  getMovieTitleController,
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

//similar movies
router.get("/related-movies/:mid/:cid", relatedMovieController);

//get movie schedules
router.get("/movie-schedules/:id", getMovieSchedulesController);

//Tiny
//get movie title route for the user to view
router.get("/get-movie-title/:id", getMovieTitleController);

export default router;
