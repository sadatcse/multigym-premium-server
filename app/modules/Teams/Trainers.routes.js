import { Router } from "express";
import {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  removeTrainer,
  updateTrainer,
} from "./Trainers.controller.js";
import { protect } from "../../../middleware/authMiddleware.js";

const TrainersRoutes = Router();

TrainersRoutes.get("/get-all", getAllTrainers);
TrainersRoutes.get("/get-id/:id", getTrainerById);
TrainersRoutes.post("/post", protect, createTrainer);
TrainersRoutes.delete("/delete/:id", protect, removeTrainer);
TrainersRoutes.put("/put/:id", protect, updateTrainer);

export default TrainersRoutes;
