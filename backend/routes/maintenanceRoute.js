import express from "express";
import {
  createTaskController,
  deleteTaskController,
  getSingleTaskController,
  getTaskController,
  updateTaskController,
} from "../controllers/maintenanceController.js";
import formidable from "express-formidable";

//router object
const router = express.Router();

//routing
//Add maintenance task || Method POST
router.post("/createTask", formidable(), createTaskController);

//Get maintenance task
router.get("/getTask", getTaskController);

//Get single maintenance task
router.get("/getTask/:id", getSingleTaskController);

//delete maintenance task
router.delete("/deleteTask/:id", deleteTaskController);

//Update maintenance task
router.put("/updateTask/:id", formidable(), updateTaskController);

export default router;
