import { Router } from "express";
import TestimonialRoutes from "../app/modules/testimonials/Testimonial.routes.js";
import NoticeRoutes from "../app/modules/notices/Notices.routes.js";
import NewsRoutes from "../app/modules/blogs/News.routes.js";
import TrainerRoutes from "../app/modules/Teams/Trainers.routes.js";

import authRoutes from "../app/modules/auth/auth.routes.js";

const routes = Router();

// Testimonial routes
routes.use("/testimonial", TestimonialRoutes);

// Notice routes
routes.use("/notice", NoticeRoutes);

// News routes
routes.use("/news", NewsRoutes);

// Trainer routes
routes.use("/trainer", TrainerRoutes);

// SignIn routes
routes.use("/auth", authRoutes);

export default routes;
