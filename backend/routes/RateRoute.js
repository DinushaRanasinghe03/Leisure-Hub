import express from 'express';
import RateController from "../controllers/RateController.js";


const rate_router = express.Router();

rate_router.get("/", RateController.getAllRate);
rate_router.post("/", RateController.addRate);
rate_router.get("/:id", RateController.getById);
rate_router.put("/:id", RateController.updateRate);
rate_router.delete("/:id", RateController.deleteRate);

export default rate_router;
