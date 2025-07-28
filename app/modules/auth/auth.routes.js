import { Router } from "express";
import { signIn } from "./auth.controller.js";

const authRoutes = Router();

// authRoutes.get("/get-all", getAllNews);

// authRoutes.get("/get-id/:id", getNewsById);

authRoutes.post("/sign-in", signIn);

// authRoutes.put("/put/:id", updateNews);

// authRoutes.delete("/delete/:id", removeNews);

export default authRoutes;
