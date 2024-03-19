import express from "express";
import {
  createResourceController,
  deleteResourceController,
  getResourceController,
  getSingleResourceController,
  updateResourceController,
} from "./../controllers/resourceController.js";
import formidable from "express-formidable";

//router object
const router = express.Router();

//routing
//Add resources || Method POST
router.post("/createResource", formidable(), createResourceController);

//Get resource
router.get("/getResource", getResourceController);

//Get single resource
router.get("/getResource/:id", getSingleResourceController);

//delete resource
router.delete("/deleteResource/:id", deleteResourceController);

//Update resource
router.put("/updateResource/:id", formidable(), updateResourceController);

export default router;
