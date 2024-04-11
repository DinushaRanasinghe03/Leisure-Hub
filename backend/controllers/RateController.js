import Rate from "../models/RateModel.js";

const getAllRate = async (req, res, next) => {
  try {
    const rate = await Rate.find();
    if (!rate || rate.length === 0) {
      return res.status(404).json({ message: "Rate not found" });
    }
    return res.status(200).json({ rate });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addRate = async (req, res, next) => {
  const { filmname, name, gmail, ratestar, comment } = req.body;
  try {
    const rate = new Rate({ filmname, name, gmail, ratestar, comment });
    await rate.save();
    return res.status(200).json({ rate });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const rate = await Rate.findById(id);
    if (!rate) {
      return res.status(404).json({ message: "Rate not found" });
    }
    return res.status(200).json({ rate });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateRate = async (req, res, next) => {
  const id = req.params.id;
  const { filmname, name, gmail, ratestar, comment } = req.body;
  try {
    let rate = await Rate.findByIdAndUpdate(
      id,
      { filmname, name, gmail, ratestar, comment },
      { new: true }
    );
    if (!rate) {
      return res.status(404).json({ message: "Rate not found" });
    }
    return res.status(200).json({ rate });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteRate = async (req, res, next) => {
  const id = req.params.id;
  try {
    const rate = await Rate.findByIdAndDelete(id);
    if (!rate) {
      return res.status(404).json({ message: "Rate not found" });
    }
    return res.status(200).json({ rate });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default { getAllRate, addRate, getById, updateRate, deleteRate };
