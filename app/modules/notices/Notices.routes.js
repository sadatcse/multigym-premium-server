import { Router } from "express";
import {
  getAllNotices,
  getNoticeById,
  createNotice,
  removeNotice,
  updateNotice,
} from "./Notices.controller.js";
import { protect } from "../../../middleware/authMiddleware.js";

const NoticesRoutes = Router();

NoticesRoutes.get("/get-all", getAllNotices);
NoticesRoutes.get("/get-id/:id", getNoticeById);
NoticesRoutes.post("/post", protect, createNotice);
NoticesRoutes.delete("/delete/:id", protect, removeNotice);
NoticesRoutes.put("/put/:id", protect, updateNotice);

export default NoticesRoutes;
