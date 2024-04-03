import movieScheduleModel from "../models/movieScheduleModel.js"
import movieModel from "../models/movieModel.js";

// Controller function for creating a movie schedule
export const createMovieScheduleController = async (req, res) => {
    try {
        const {date,from,to,movie} = req.fields

        //validation
        switch(true){
            case !date:
                return res.status(500).send({error: 'date is required'})
            case !from:
                return res.status(500).send({error: 'from time is required'})
            case !to:
                return res.status(500).send({error: 'to time is required'})
            case !movie:
                return res.status(500).send({error: 'movie is required'}) 
                            
        }

        const movieschedule = new movieScheduleModel({...req.fields})
        
        await movieschedule.save()
        res.status(201).send({
            success:true,
            message: 'Movie schedule added successfully',
            movieschedule
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in creating schedule'
        })
    }
};



//get single movieschedule
export const getSingleMovieScheduleController = async(req,res) => {
    try {
        const movieschedule = await movieScheduleModel.findById(req.params.id)
        res.status(200).send({
            success:true,
            message:"One schedule fetched",
            movieschedule
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting single product',
            error
        })
    }
}



//get all movie schedules
export const getMovieScheduleController = async(req,res) => {
    try {
        const movieschedule = await movieScheduleModel.find()
        res.status(201).send({
            success:true,
            counTotal: movieschedule.length,
            message: "All movie schedule",
            movieschedule
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting movie schedules',
            error: error.message
        })
    }
}



// Controller function to get schedules based on date
export const getMovieSchedulesByDateController = async (req, res) => {
    try {
        const { date } = req.params;

        // Validate if date is provided
        if (!date) {
            return res.status(400).send({ error: 'Date is required' });
        }

        // Find all movie schedules for the given date and populate the movie field with movie details
        const movieSchedules = await movieScheduleModel.find({ date }).populate('movie');

        res.status(200).send({
            success: true,
            countTotal: movieSchedules.length,
            message: `Movie schedules for ${date}`,
            movieSchedules
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting movie schedules by date',
            error: error.message
        });
    }
};



//update movie schedule
export const updateMovieScheduleController = async (req, res) => {
    try {
        const { date, from, to, movie,unavailable_seats} = req.fields;

        // Validation
        switch (true) {
            case !date:
                return res.status(400).send({ error: 'Date is required' });
            case !from:
                return res.status(400).send({ error: 'Showtime "from" is required' });
            case !to:
                return res.status(400).send({ error: 'Showtime "to" is required' });
            case !movie:
                return res.status(400).send({ error: 'Movie is required' });
        }


        // Find and update movie schedule
        const movieschedule = await movieScheduleModel.findByIdAndUpdate(
            req.params.id,
            { date, from, to, movie, unavailable_seats },
            { new: true } // Returns the updated document
        );

        // Check if movie schedule is found
        if (!movieschedule) {
            return res.status(404).send({ error: 'Movie schedule not found' });
        }

        res.status(200).send({
            success: true,
            message: 'Movie schedule updated successfully',
            movieschedule
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: 'Error in updating schedule'
        });
    }
};



//delete a movie schedule
export const deleteMovieScheduleController = async (req, res) => {
    try {
        // Find and delete the movie schedule by ID
        const deletedMovieSchedule = await movieScheduleModel.findByIdAndDelete(req.params.id);

        // Check if the movie schedule was found and deleted
        if (!deletedMovieSchedule) {
            return res.status(404).send({
                success: false,
                message: 'Movie schedule not found'
            });
        }

        // If successful, send success response
        res.status(200).send({
            success: true,
            message: 'Movie schedule deleted successfully'
        });
    } catch (error) {
        // Log and send error response if deletion fails
        console.error('Error deleting movie schedule:', error);
        res.status(500).send({
            success: false,
            message: 'Error while deleting movie schedule',
            error: error.message
        });
    }
};



//generate report
// Function to generate the report
export const generateMovieReport = async (req, res) => {
    try {
        // Retrieve all movies
        const movies = await movieModel.find({}, '_id name');

        // Retrieve all movie schedules
        const movieSchedules = await movieScheduleModel.find({}, 'date movie');

        // Initialize an empty object to store movie schedule counts
        const movieScheduleCounts = {};

        // Iterate through each movie schedule
        movieSchedules.forEach(schedule => {
            // Extract month and year from the schedule date
            const monthYear = `${schedule.date.getFullYear()}-${schedule.date.getMonth() + 1}`;

            // If the month-year key doesn't exist in the movie schedule counts object, initialize it
            if (!movieScheduleCounts[monthYear]) {
                movieScheduleCounts[monthYear] = {};
            }

            // If the movie ID doesn't exist in the month-year object, initialize it
            if (!movieScheduleCounts[monthYear][schedule.movie]) {
                movieScheduleCounts[monthYear][schedule.movie] = 0;
            }

            // Increment the count for the movie in that month
            movieScheduleCounts[monthYear][schedule.movie]++;
        });

        // Prepare the report data
        const report = [];

        // Iterate through each month-year
        for (const monthYear in movieScheduleCounts) {
            const monthReport = {
                monthYear,
                movies: []
            };

            // Iterate through each movie and its count in that month
            for (const movie of movies) {
                const movieId = movie._id.toString();
                const movieName = movie.name;
                const movieCount = movieScheduleCounts[monthYear][movieId] || 0;

                // Add movie details to the month report
                monthReport.movies.push({
                    name: movieName,
                    count: movieCount
                });
            }

            // Add the month report to the overall report
            report.push(monthReport);
        }

        // Send the report as response
        res.status(200).json({
            success: true,
            report
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in generating movie report',
            error: error.message
        });
    }
};
