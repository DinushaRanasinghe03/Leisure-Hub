import express from 'express';
import * as FeedController from "../controllers/FeedBackController.js"; // Use import syntax for ES modules

const feed_router = express.Router();

feed_router.get("/", FeedController.getAllFeedback);
feed_router.post("/", FeedController.addFeedback);

export default feed_router; // Use export syntax for ES modules
