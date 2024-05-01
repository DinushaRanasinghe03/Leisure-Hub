import express from "express";
import {
  createResourceController,
  deleteResourceController,
  getResourceController,
  getSingleResourceController,
  updateResourceController,
} from "./../controllers/resourceController.js";

//router object
const router = express.Router();

//routing
//Add resources || Method POST
router.post("/createResource", createResourceController);

//Get resource
router.get("/getResource", getResourceController);

//Get single resource
router.get("/getResource/:id", getSingleResourceController);

//delete resource
router.delete("/deleteResource/:id", deleteResourceController);

// Update resource
router.put("/updateResource/:id", updateResourceController);

export default router;