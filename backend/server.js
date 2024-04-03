import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import EmployeeRouter from './routes/EmployeeRouter.js'
import EmployeeLeaveRouter from './routes/EmployeeLeaveRouter.js'
import EmployeeSalaryRouter from './routes/EmployeeSalaryRouter.js'
import cors from 'cors';

//configure env
dotenv.config() 

//database config
connectDB()

//rest object
const app = express()

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//throw API to EmployeeRouter class
//app.use('/employee', EmployeeRouter);
app.use("/api/v1/employee",EmployeeRouter);

//throw API to EmployeeLeaveRouter class
app.use("/api/v1/employeeleave", EmployeeLeaveRouter);

//throw API to EmployeeSalaryRouter class
app.use("/api/v1/employeeSalary", EmployeeSalaryRouter);

//rest API / connect with frontend
app.get('/',(req,res) => {
    res.send(
        "<h1>Welcome to Leisure Hub</h1>"
    )
});

//port
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE}mode on port ${PORT}`)
})