import movieScheduleModel from "../models/movieScheduleModel.js";
import bookingModel from "../models/bookingModel.js";

export const getBookingController = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({})
      .populate({ path: "movie schedule", select: "-poster_image" })
      .limit(10)
      .sort({ createdAt: -1 });

    res.status(201).send({
      success: true,
      counTotal: bookings.length,
      message: "All bookings",
      bookings,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Something failed.",
    });
  }
};

export const newBookingController = async (req, res) => {
  try {
    const {
      schedule_id,
      name,
      email,
      mobile,
      seats,
      adults,
      adults_price,
      children,
      children_price,
    } = req.body;

    if (!name || !email || !mobile || !seats)
      return res.status(500).send({
        error: "One of the required field is empty",
      });

    if (
      !Number.isInteger(adults) ||
      !Number.isInteger(children) ||
      (adults <= 0 && children <= 0)
    )
      return res.status(500).send({
        error: "Invalid ticket count",
      });

    if (
      !Number.isInteger(adults_price) ||
      !Number.isInteger(children_price) ||
      adults_price <= 0 ||
      children_price <= 0
    )
      return res.status(500).send({
        error: "Invalid ticket price",
      });

    let schedule = await movieScheduleModel.findById(schedule_id);

    if (!schedule)
      return res
        .status(404)
        .send({ error: "The Movie schedule with the given ID was not found." });

    schedule.unavailable_seats = [...schedule.unavailable_seats, ...seats];
    schedule.save();

    const total = adults * adults_price + children * children_price;
    
    const booking = await new bookingModel({
      movie: schedule.movie,
      schedule: schedule_id,
      name,
      email,
      mobile,
      seats,
      adults,
      adults_price,
      children,
      children_price,
      total,
    }).save();
    res.status(201).send({
      success: true,
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Something failed.",
    });
  }
};
