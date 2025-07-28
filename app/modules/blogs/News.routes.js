import { Router } from "express";
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  removeNews,
} from "./News.controller.js";
import { protect } from "../../../middleware/authMiddleware.js";

const NewsRoutes = Router();

NewsRoutes.get("/get-all", getAllNews);

NewsRoutes.get("/get-id/:id", getNewsById);

NewsRoutes.post("/post", protect, createNews);

NewsRoutes.put("/put/:id", protect, updateNews);

NewsRoutes.delete("/delete/:id", protect, removeNews);

export default NewsRoutes;
