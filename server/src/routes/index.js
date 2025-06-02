import userRoutes from "./api/users.js";
import express from "express";

const router = express.Router();

router.use("/api/users", userRoutes); // accouts/me is protected from within the /accounts file

export default router;
