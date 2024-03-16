import express from 'express'
import { createMovieController, deleteMovieController, getMovieController, getSingleMovieController, moviePosterimageController, updateMovieController } from '../controllers/movieController.js'
import formidable from 'express-formidable'

const router = express.Router()

//routes
//add movies
router.post('/create-movie',formidable(),createMovieController )

//get movies
router.get('/get-movie', getMovieController )

//get single movie
router.get('/get-movie/:slug',getSingleMovieController )

//get photo
router.get('/movie-posterimage/:mid',moviePosterimageController )

//delete movie
router.delete('/delete-movie/:mid',deleteMovieController )

//update movie
router.put('/update-movie/:mid',formidable(),updateMovieController )

export default router