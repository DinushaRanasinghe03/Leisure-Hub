const Feedback = require("../Model/FeedBackModel");

const getAllFeedback = async (req, res, next) => {
  let feedback;
  // Get all feedback
  try {
    feedback = await Feedback.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!feedback) {
    return res.status(404).json({ message: "feedbackUs not found" });
  }
  // Display all feedback
  return res.status(200).json({ feedback });
};

// data Insert
const addFeedback = async (req, res, next) => {
  const { name, gmail, category, message,solution } = req.body;

  let feedback;

  try {
    feedback = new Feedback({ name, gmail, category, message,solution });
    await feedback.save();
  } catch (err) {
    console.log(err);
  }
  // not insert feedbacks
  if (!feedback) {
    return res.status(404).json({ message: "unable to add feedbacks" });
  } 
  return res.status(200).json({ feedback });
};

exports.getAllFeedback = getAllFeedback;
exports.addFeedback = addFeedback; 
 