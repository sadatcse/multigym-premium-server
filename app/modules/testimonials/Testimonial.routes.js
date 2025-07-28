import { Router } from "express";
import {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  removeTestimonial,
} from "./Testimonial.controller.js";
import { protect } from "../../../middleware/authMiddleware.js";

const TestimonialRoutes = Router();

TestimonialRoutes.get("/get-all", getAllTestimonials);

TestimonialRoutes.get("/get-id/:id", getTestimonialById);

TestimonialRoutes.post("/post", protect, createTestimonial);

TestimonialRoutes.put("/put/:id", protect, updateTestimonial);

TestimonialRoutes.delete("/delete/:id", protect, removeTestimonial);

export default TestimonialRoutes;
