const express = require("express");
const feed_router = express.Router();
//Insert Model
const Feed = require("../Model/FeedBackModel");
//Insert User Controller
const FeedController = require("../Controllers/FeedBackController");


feed_router.get("/", FeedController.getAllFeedback);
feed_router.post("/", FeedController.addFeedback);

//export
module.exports = feed_router;