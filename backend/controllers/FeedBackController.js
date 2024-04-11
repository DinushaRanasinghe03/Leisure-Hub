import Feedback from "../models/FeedBackModel.js";

export const getAllFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find();
    if (!feedback || feedback.length === 0) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    return res.status(200).json({ feedback });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addFeedback = async (req, res, next) => {
  const { name, gmail, category, message, solution } = req.body;
  try {
    const feedback = new Feedback({ name, gmail, category, message, solution });
    await feedback.save();
    return res.status(200).json({ feedback });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
