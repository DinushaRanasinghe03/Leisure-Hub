import movieScheduleModel from "../models/movieScheduleModel.js";

// Controller function for creating a movie schedule
export const createMovieScheduleController = async (req, res) => {
  try {
    const { date, from, to, movie, unavailable_seats } = req.fields;

    //validation
    switch (true) {
      case !date:
        return res.status(500).send({ error: "date is required" });
      case !from:
        return res.status(500).send({ error: "showtime_1 is required" });
      case !to:
        return res.status(500).send({ error: "showtime_2 is required" });
      case !movie:
        return res.status(500).send({ error: "showtime_3 is required" });
      case !unavailable_seats:
        return res.status(500).send({ error: "showtime_3 is required" });
    }

    const movieschedule = new movieScheduleModel({ ...req.fields });

    await movieschedule.save();
    res.status(201).send({
      success: true,
      message: "Movie schedule added successfully",
      movieschedule,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating schedule",
    });
  }
};

//get single movieschedule
export const getSingleMovieScheduleController = async (req, res) => {
  try {
    const movieschedule = await movieScheduleModel.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "One schedule fetched",
      movieschedule,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

//get all movie schedules
export const getMovieScheduleController = async (req, res) => {
  try {
    const movieschedule = await movieScheduleModel.find();
    res.status(201).send({
      success: true,
      counTotal: movieschedule.length,
      message: "All movie schedule",
      movieschedule,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting movie schedules",
      error: error.message,
    });
  }
};

//update movie schedule
export const updateMovieScheduleController = async (req, res) => {
  try {
    const { date, from, to, movie, unavailable_seats } = req.fields;

    // Validation
    switch (true) {
      case !date:
        return res.status(400).send({ error: "Date is required" });
      case !from:
        return res.status(400).send({ error: 'Showtime "from" is required' });
      case !to:
        return res.status(400).send({ error: 'Showtime "to" is required' });
      case !movie:
        return res.status(400).send({ error: "Movie is required" });
      case !unavailable_seats:
        return res.status(500).send({ error: "showtime_3 is required" });
    }

    // Find and update movie schedule
    const movieschedule = await movieScheduleModel.findByIdAndUpdate(
      req.params.id,
      { date, from, to, movie, unavailable_seats },
      { new: true } // Returns the updated document
    );

    // Check if movie schedule is found
    if (!movieschedule) {
      return res.status(404).send({ error: "Movie schedule not found" });
    }

    res.status(200).send({
      success: true,
      message: "Movie schedule updated successfully",
      movieschedule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in updating schedule",
    });
  }
};

//delete a movie schedule
export const deleteMovieScheduleController = async (req, res) => {
  try {
    // Find and delete the movie schedule by ID
    const deletedMovieSchedule = await movieScheduleModel.findByIdAndDelete(
      req.params.id
    );

    // Check if the movie schedule was found and deleted
    if (!deletedMovieSchedule) {
      return res.status(404).send({
        success: false,
        message: "Movie schedule not found",
      });
    }

    // If successful, send success response
    res.status(200).send({
      success: true,
      message: "Movie schedule deleted successfully",
    });
  } catch (error) {
    // Log and send error response if deletion fails
    console.error("Error deleting movie schedule:", error);
    res.status(500).send({
      success: false,
      message: "Error while deleting movie schedule",
      error: error.message,
    });
  }
};
