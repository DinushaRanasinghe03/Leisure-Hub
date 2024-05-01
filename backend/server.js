import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import activityCategoryRoutes from "./routes/activityCategoryRoutes.js";
import gamesAndActivitiesRoutes from "./routes/gamesAndActivitiesRoutes.js";
import gamesAndActivitiesRequestRoutes from "./routes/gamesAndActivitiesRequestRoutes.js";
import movieCategoryRoutes from "./routes/movieCategoryRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import movieScheduleRoutes from "./routes/movieScheduleRoutes.js";
import buyTicketsRoutes from "./routes/buyTicketsRoutes.js";
import { fileURLToPath } from "url";
import path from "path";
import authRoutes from "./routes/authRoute.js";
import EmployeeRouter from "./routes/EmployeeRouter.js";
import EmployeeLeaveRouter from "./routes/EmployeeLeaveRouter.js";
import EmployeeSalaryRouter from "./routes/EmployeeSalaryRouter.js";
import ContactUsRoute from "./routes/ContactUsRoute.js";
import RateRoute from "./routes/RateRoute.js";
import FeedbackRoute from "./routes/FeedBackRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cardDetailsRoute from "./routes/cardDetailsRoute.js";
import membershipPaymentRoute from "./routes/membershipPaymentRoute.js";
import paymentSummaryRoute from "./routes/paymentSummaryRoute.js";
import bookingsRoutes from "./routes/bookingsRoutes.js";


import resourceRoutes from "./routes/resourceRoute.js";

// Get directory path of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//configure env
dotenv.config({ path: path.join(__dirname, ".env") });

//configure env
//dotenv.config();

//database config
connectDB();
//rest object
const app = express();

//middlewears
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/activitycategory", activityCategoryRoutes);
app.use("/api/v1/gameandactivity", gamesAndActivitiesRoutes);
app.use("/api/v1/gameandactivityRequest", gamesAndActivitiesRequestRoutes);
app.use("/api/v1/moviecategory", movieCategoryRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/movieschedule", movieScheduleRoutes);
app.use("/api/v1/buytickets", buyTicketsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/employee", EmployeeRouter);
app.use("/api/v1/employeeleave", EmployeeLeaveRouter);
app.use("/api/v1/employeeSalary", EmployeeSalaryRouter);
app.use("/contacts", ContactUsRoute);
app.use("/rates", RateRoute);
app.use("/feedback", FeedbackRoute);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/cardpayments", cardDetailsRoute);
app.use("/api/v1/membershipPayments", membershipPaymentRoute);
app.use("/api/v1/paymentsummaries", paymentSummaryRoute);
app.use("/api/v1/bookings", bookingsRoutes);

app.use("/api/v1/resources", resourceRoutes);


//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to leisurehub</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
