const Rate = require("../Model/RateModel");

const getAllRate = async (req, res, next) => {
  let rate;
  // Get all rate
  try {
    rate = await Rate.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!rate) {
    return res.status(404).json({ message: "Rate not found" });
  }
  // Display all rate
  return res.status(200).json({ rate });
};

// data Insert
const addRate = async (req, res, next) => {
  const { filmname, name, gmail, ratestar, comment } = req.body;

  let rate; 

  try {
    rate = new Rate({ filmname, name, gmail, ratestar, comment });
    await rate.save();
  } catch (err) {
    console.log(err);
  }
  // not insert rates
  if (!rate) {
    return res.status(404).json({ message: "unable to add rates" });
  }
  return res.status(200).json({ rate });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let rate;

  try {
    rate = await Rate.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available rates
  if (!rate) {
    return res.status(404).json({ message: "rate Not Found" });
  }
  return res.status(200).json({ rate });
};

//Update rate Details
const updateRate = async (req, res, next) => {
  const id = req.params.id;
  const { filmname, name, gmail, ratestar, comment } = req.body;

  let rates;

  try {
    rates = await Rate.findByIdAndUpdate(id, {
      filmname: filmname,
      name: name,
      gmail: gmail,
      ratestar: ratestar,
      comment: comment,
    });
    rates = await rates.save();
  } catch (err) {
    console.log(err);
  }
  if (!rates) {
    return res.status(404).json({ message: "Unable to Update rate Details" });
  }
  return res.status(200).json({ rates });
};

//Delete rate Details
const deleteRate = async (req, res, next) => {
  const id = req.params.id;

  let rate;

  try {
    rate = await Rate.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!rate) {
    return res.status(404).json({ message: "Unable to Delete rate Details" });
  }
  return res.status(200).json({ rate });
};

exports.getAllRate = getAllRate;
exports.addRate = addRate;
exports.getById = getById;
exports.updateRate = updateRate;
exports.deleteRate = deleteRate;
