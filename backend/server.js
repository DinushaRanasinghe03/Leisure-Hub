const express = require("express");
const mongoose = require("mongoose");
const ContactRoute = require("./Routes/ContactUsRoute.js");
const RateRoute = require("./Routes/RateRoute.js");
const FeedbackRoute = require("./Routes/FeedBackRoutes.js");
const connectDB = require("./Config/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

//Routes
app.use("/contacts", ContactRoute);
app.use("/rates", RateRoute);
app.use("/feedback", FeedbackRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
