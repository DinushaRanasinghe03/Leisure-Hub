import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import movieCategoryRoutes from "./routes/movieCategoryRoutes.js";
import movieScheduleRoutes from "./routes/movieScheduleRoutes.js";
import buyTicketsRoutes from "./routes/buyTicketsRoutes.js"

//configure env
dotenv.config();

//database config
connectDB();

//res object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/moviecategory", movieCategoryRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/movieschedule", movieScheduleRoutes);
app.use("/api/v1/buytickets", buyTicketsRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Leisure Hub</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
