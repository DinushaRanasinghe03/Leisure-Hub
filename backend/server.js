import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from "path";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";

// Get directory path of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//configure env
dotenv.config({ path:path.join(__dirname,'.env') });

//database config
connectDB();

//rest object
const app=express();

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth", authRoutes)


//rest api
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to LEISURE HUB</h1>");
});

//PORT
const PORT=process.env.PORT ||8080; 

//run listen
app.listen(PORT,()=>{
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT} `.bgCyan.white);
});