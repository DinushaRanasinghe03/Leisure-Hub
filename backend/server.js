import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import resourceRoutes from "./routes/resourceRoute.js";
import maintenanceRoutes from "./routes/maintenanceRoute.js";
import cors from "cors";

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/resources", resourceRoutes);
app.use("/api/v1/maintenances", maintenanceRoutes);

//rest api
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to Leisure management System</h1>`);
});

//port
const PORT = process.env.PORT || 8070;

//run listen
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
